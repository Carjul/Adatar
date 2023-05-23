package main

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/360EntSecGroup-Skylar/excelize"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

func main() {
	db, err := sql.Open("postgres", "postgres://admin:12345@173.230.132.232:5432/adatar?sslmode=disable")
	if err != nil {
		fmt.Println("Error al conectarse a la base de datos:", err)
		return
	}
	defer db.Close()

	// Verificación de la conexión
	err = db.Ping()
	if err != nil {
		fmt.Println("No se pudo establecer conexión con la base de datos:", err)
		return
	}
	fmt.Println("Conexión establecida con éxito")

	app := mux.NewRouter()

	// Rutas
	app.HandleFunc("/service", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Servicio iniciado"))

	})

	//ruta para leer el archivo excel
	app.HandleFunc("/service/upload", func(w http.ResponseWriter, r *http.Request) {
		// Parseamos el archivo que se subió
		r.ParseMultipartForm(10 << 20) // permitir hasta 10 MB de tamaño de archivo
		file, _, err := r.FormFile("file")
		if err != nil {
			fmt.Println("Error al cargar el archivo:", err)
			return
		}
		defer file.Close()

		// Leemos el archivo Excel
		data, err := ioutil.ReadAll(file)
		if err != nil {
			fmt.Println("Error al leer el archivo:", err)
			return
		}

		// Creamos un nuevo objeto Excelize y abrimos el archivo
		f, err := excelize.OpenReader(bytes.NewReader(data))
		if err != nil {
			fmt.Println("Error al abrir el archivo Excel:", err)
			return
		}

		// Convertir hoja a slice de maps
		filas := f.GetRows("Data")
		if err != nil {
			log.Fatal(err)
		}
		reporte := []map[string]string{}
		encabezados := filas[0]
		for _, fila := range filas[1:] {
			m := map[string]string{}
			for j, celda := range fila {
				m[encabezados[j]] = celda
			}
			reporte = append(reporte, m)
		}

		//conver to json
		dataJSON, err := json.Marshal(reporte)
		// Mostramos la lista en la consola

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(dataJSON)

	}).Methods("POST")

	//ruta notas por peiodo academico
	app.HandleFunc("/service/Notas_periodo", func(w http.ResponseWriter, r *http.Request) {
		var params struct {
			ProgramaID string `json:"programa_id"`
		}

		decoder := json.NewDecoder(r.Body)
		defer r.Body.Close()
		if err := decoder.Decode(&params); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		query := `SELECT  COUNT(*) AS value ,n."Rango" AS name
		FROM Public."Notas" n
		WHERE n."ProgramaId" = $1
		GROUP BY n."Rango";`

		args := []interface{}{params.ProgramaID}
		rows, err := db.Query(query, args...)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		type Resultado struct {
			Value string `json:"value"`
			Name  string `json:"name"`
		}

		notas := []Resultado{}

		for rows.Next() {
			var value string
			var name string

			err = rows.Scan(&value, &name)
			if err != nil {
				log.Fatal(err)
			}
			notas = append(notas, Resultado{Value: value, Name: name})
		}

		if err := rows.Err(); err != nil {
			log.Fatal(err)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(notas)

	}).Methods("POST")

	app.HandleFunc("/service/Materias", func(w http.ResponseWriter, r *http.Request) {
		var params struct {
			ProgramaID string `json:"programa_id"`
		}

		decoder := json.NewDecoder(r.Body)
		defer r.Body.Close()
		if err := decoder.Decode(&params); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		query := `SELECT mp."MateriaId", m."NombreMateria", 
    	COUNT(CASE WHEN n."Gano" = 1 THEN 1 END) AS "Gano",
    	COUNT(CASE WHEN NOT n."Gano" = 1 THEN 1 END) AS "Perdio"
		FROM Public."MateriaPorPensums" mp
		JOIN Public."Materias" m ON mp."MateriaId" = m."id"
		JOIN Public."Notas" n ON mp."MateriaId" = n."MateriaId"
		WHERE mp."PensumId" = $1
 		GROUP BY mp."MateriaId", m."NombreMateria";
		`
		args := []interface{}{params.ProgramaID}
		rows, err := db.Query(query, args...)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()
		type Resultado struct {
			MateriaID     int    `json:"materia_id"`
			NombreMateria string `json:"nombre"`
			Gano          int    `json:"gano"`
			Perdio        int    `json:"perdio"`
		}

		materias := []Resultado{}

		for rows.Next() {
			var materia_id int
			var nombre string
			var gano int
			var perdio int

			err = rows.Scan(&materia_id, &nombre, &gano, &perdio)
			if err != nil {
				log.Fatal(err)
			}
			materias = append(materias, Resultado{MateriaID: materia_id, NombreMateria: nombre, Gano: gano, Perdio: perdio})
		}

		if err = rows.Err(); err != nil {
			log.Fatal(err)
		}

		materiasJSON, err := json.Marshal(materias)
		if err != nil {
			log.Fatal(err)
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(materiasJSON)

	}).Methods("POST")

	//ruta notas por rango
	app.HandleFunc("/service/notas/rango", func(w http.ResponseWriter, r *http.Request) {
		var params struct {
			PensumID string `json:"pensum_id"`
		}

		decoder := json.NewDecoder(r.Body)
		defer r.Body.Close()
		if err := decoder.Decode(&params); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		query := `SELECT n.id, n."Nota",
		CASE
			WHEN n."Nota" < '2.0' THEN 'Muy Baja'
			WHEN n."Nota" >= '2.0' AND n."Nota" < '3.0' THEN 'Baja'
			WHEN n."Nota" >= '3.0' AND n."Nota" < '4.0' THEN 'Media'
			WHEN n."Nota" >= '4.0' AND n."Nota" < '4.5' THEN 'Alta'
			WHEN n."Nota" >= '4.5' AND n."Nota" <= '5.0' THEN 'Muy Alta'
			ELSE 'N/A'
		END AS "Rango",
		mp."SemMateriaNum" AS Semestres
	FROM Public."Notas" n
	JOIN Public."MateriaPorPensums" mp ON n."MateriaId" = mp."MateriaId"
	WHERE mp."PensumId" = $1
	ORDER BY Semestres ASC;`
		args := []interface{}{params.PensumID}
		rows, err := db.Query(query, args...)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		type Resultado struct {
			ID        int    `json:"id"`
			Nota      string `json:"nota"`
			Rango     string `json:"rango"`
			Semestres string `json:"semestres"`
		}

		notas_por_pemsun := []Resultado{}

		for rows.Next() {
			var id int
			var nota string
			var rango string
			var semestres string

			err = rows.Scan(&id, &nota, &rango, &semestres)
			if err != nil {
				log.Fatal(err)
			}
			notas_por_pemsun = append(notas_por_pemsun, Resultado{ID: id, Nota: nota, Rango: rango, Semestres: semestres})
		}
		err = rows.Err()
		if err != nil {
			log.Fatal(err)
		}
		notas_por_pemsunJSON, err := json.Marshal(notas_por_pemsun)
		if err != nil {
			log.Fatal(err)
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(notas_por_pemsunJSON)

	}).Methods("POST")

	// Agregar tus rutas aquí
	app.HandleFunc("/service/notas", func(w http.ResponseWriter, r *http.Request) {

		// Leer los parámetros de la solicitud
		var params struct {
			Semestre         int    `json:"semestre"`
			PensumID         string `json:"pensum_id"`
			PeriodoAcademico int    `json:"periodo_academico"`
		}
		err := json.NewDecoder(r.Body).Decode(&params)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Preparar la consulta SQL con los parámetros
		query := `
			SELECT e.id AS estudiante_id, e."Nombres" AS estudiante_nombre, m."SemMateriaNum" AS semestre, n."Nota", n."ProxNotaMin"
			FROM Public."Estudiantes" e
			INNER JOIN Public."Notas" n ON e.id = n."EstudianteId"
			INNER JOIN public."MateriaPorPensums" m ON n."MateriaId" = m."MateriaId" AND n."MateriaId" = m."MateriaId"
			WHERE m."SemMateriaNum" = $1 AND n."Perdio" = 1 AND n."PeriodoAcademicoId" = $2 AND m."PensumId" = $3
		`
		args := []interface{}{params.Semestre, params.PeriodoAcademico, params.PensumID}

		// Ejecutar la consulta SQL
		rows, err := db.Query(query, args...)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		// Crear una estructura para almacenar los resultados
		type Resultado struct {
			EstudianteID     string `json:"estudiante_id"`
			EstudianteNombre string `json:"estudiante_nombre"`
			Semestre         int    `json:"semestre"`
			Nota             string `json:"nota"`
			ProxNotaMin      string `json:"prox_nota_min"`
		}
		estudiantes := []Resultado{}

		for rows.Next() {
			var estudianteID string
			var estudianteNombre string
			var semestre int
			var nota string
			var proxNotaMin string

			err = rows.Scan(&estudianteID, &estudianteNombre, &semestre, &nota, &proxNotaMin)
			if err != nil {
				log.Fatal(err)
			}

			estudiante := Resultado{
				EstudianteID:     estudianteID,
				EstudianteNombre: estudianteNombre,
				Semestre:         semestre,
				Nota:             nota,
				ProxNotaMin:      proxNotaMin,
			}

			estudiantes = append(estudiantes, estudiante)
		}
		estudianteJSON, err := json.Marshal(estudiantes)
		if err != nil {
			log.Fatal(err)
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(estudianteJSON)

	}).Methods("POST")

	// Configurar el middleware CORS
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Accept", "Content-Type", "Content-Length", "Accept-Encoding", "Authorization"},
	})

	// Envolver el enrutador con el middleware CORS
	router := c.Handler(app)

	// Iniciar el servidor HTTP
	http.ListenAndServe(":8000", router)
	fmt.Println("Servidor iniciado en el puerto 8000")
}
