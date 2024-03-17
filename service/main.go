package main

import (
	"log"
	"net/http"

	"github.com/Carjul/api_rest_go/db"
	"github.com/Carjul/api_rest_go/routes"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)


func main() {
	loadEnv()
	Database := db.InitDB()
	defer Database.Close()

	app := mux.NewRouter()

	// Rutas
	routes.Routes(app, Database)

	// Configurar el middleware CORS
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Accept", "Content-Type", "Content-Length", "Accept-Encoding", "Authorization"},
	})

	// Envolver el enrutador con el middleware CORS
	router := c.Handler(app)

	// Iniciar el servidor HTTP
	err := http.ListenAndServe(":8000", router)
	if err != nil {
		log.Fatal("Error al iniciar el servidor:", err)
	} else {
		log.Println("Servidor iniciado en el puerto 8000")
	}

	/* app.HandleFunc("/service/MateriaDocente/{CodigoMateria}", func(w http.ResponseWriter, r *http.Request) {
		type Resultado struct {
			CogDocente    string `json:"Cog_Docente"`
			NomDocente    string `json:"Nom_Docente"`
			CodigoMateria string `json:"CodigoMateria"`
			NombreMateria string `json:"NombreMateria"`
			TipoMateria   string `json:"TipoMateria"`
		}

		// Obtener el parámetro "CodigoMateria" de la URL
		vars := mux.Vars(r)
		codigoMateria := vars["CodigoMateria"]

		// Preparar la consulta SQL
		query := `
			SELECT
				"Docentes"."Cog_Docente",
				"Docentes"."Nom_Docente",
				"Materias"."CodigoMateria",
				"Materias"."NombreMateria",
				"Materias"."TipoMateria"
			FROM Public."Notas"
			JOIN public."Docentes" ON "Docentes".id = "Notas"."DocenteId"
			JOIN public."Materias" ON "Materias".id = "Notas"."MateriaId"
			WHERE "Materias"."CodigoMateria" = $1
			GROUP BY "Docentes"."Cog_Docente", "Docentes"."Nom_Docente", "Materias"."CodigoMateria", "Materias"."NombreMateria", "Materias"."TipoMateria";
			`

		// Ejecutar la consulta SQL
		rows, err := db.Query(query, codigoMateria)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		// Crear una lista para almacenar los resultados
		resultado := Resultado{}

		for rows.Next() {

			err = rows.Scan(
				&resultado.CogDocente,
				&resultado.NomDocente,
				&resultado.CodigoMateria,
				&resultado.NombreMateria,
				&resultado.TipoMateria,
			)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

		}

		// Convertir los resultados a formato JSON y enviar la respuesta
		resultJSON, err := json.Marshal(resultado)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(resultJSON)

	}).Methods("GET")

	app.HandleFunc("/service/DataEst/{Identificacion}", func(w http.ResponseWriter, r *http.Request) {
		type EstudianteInfo struct {
			PeopleCodeID   string `json:"people_code_id"`
			Identificacion string `json:"Identificacion"`
			Nombres        string `json:"Nombres"`
			Email          string `json:"Email"`
			TelFijo        string `json:"TelFijo"`
			TelMovil       string `json:"TelMovil"`
			Direccion      string `json:"Direccion"`
		}
		// Obtener el parámetro "Identificacion" de la URL
		vars := mux.Vars(r)
		identificacion := vars["Identificacion"]

		// Preparar la consulta SQL
		query := `
		SELECT people_code_id, "Identificacion", "Nombres", "Email", "TelFijo", "TelMovil", "Direccion"
		FROM Public."Estudiantes"
		WHERE "Identificacion" = $1;
		`

		// Ejecutar la consulta SQL
		rows, err := db.Query(query, identificacion)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		// Crear una estructura para almacenar los resultados
		estudianteInfo := EstudianteInfo{}

		if rows.Next() {
			err = rows.Scan(
				&estudianteInfo.PeopleCodeID,
				&estudianteInfo.Identificacion,
				&estudianteInfo.Nombres,
				&estudianteInfo.Email,
				&estudianteInfo.TelFijo,
				&estudianteInfo.TelMovil,
				&estudianteInfo.Direccion,
			)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		}

		// Convertir los resultados a formato JSON y enviar la respuesta
		estudianteInfoJSON, err := json.Marshal(estudianteInfo)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(estudianteInfoJSON)
	}).Methods("GET") */

}
func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}
