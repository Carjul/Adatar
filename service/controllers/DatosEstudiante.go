package controllers

import (
	"encoding/json"
	"log"
	"net/http"
)

func Datos_Estudiante(w http.ResponseWriter, r *http.Request) {
	
	queryParams := r.URL.Query()
	peopleCodeID := queryParams.Get("people_code_id")

	if peopleCodeID == "" {
		http.Error(w, "El parámetro 'people_code_id' es obligatorio", http.StatusBadRequest)
		return
	}
	queryEst := `SELECT "Estudiantes".id,"Estudiantes"."Nombres", "Programas"."NombrePrograma","Materias"."NombreMateria","Notas"."Nota","PeriodoAcademicos"."Year","PeriodoAcademicos"."Periodo"  FROM "Estudiantes" AS e
	JOIN "Notas" ON "Notas"."EstudianteId" = e.id
	JOIN "Materias" ON "Materias".id = "Notas"."MateriaId"
	JOIN "Estudiantes" ON "Estudiantes".id = "Notas"."EstudianteId"
	JOIN "PeriodoAcademicos" ON "PeriodoAcademicos".id = "Notas"."PeriodoAcademicoId"
	JOIN "Programas" ON "Programas".id = "Notas"."ProgramaId"
	WHERE e.people_code_id=$1 `

	args := []interface{}{peopleCodeID}
	rows, err := Database.Query(queryEst, args...)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	type Resultado struct {
		ID             string `json:"Id"`
		Nombres        string `json:"Nombres"`
		NombrePrograma string `json:"NombrePrograma"`
		NombreMateria  string `json:"NombreMateria"`
		Nota           string `json:"Nota"`
		Year           int    `json:"Year"`
		Periodo        string `json:"Periodo"`
	}

	notasEst := []Resultado{}

	for rows.Next() {
		var Id string
		var Nombres string
		var NombrePrograma string
		var NombreMateria string
		var Nota string
		var Year int
		var Periodo string

		err = rows.Scan(&Id, &Nombres, &NombrePrograma, &NombreMateria, &Nota, &Year, &Periodo)
		if err != nil {
			log.Fatal(err)
		}
		notasEst = append(notasEst, Resultado{ID: Id, Nombres: Nombres, NombrePrograma: NombrePrograma, NombreMateria: NombreMateria, Nota: Nota, Year: Year, Periodo: Periodo})
	}

	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(notasEst)

}

func Semestre_Estudiante(w http.ResponseWriter, r *http.Request) {
	
	var params struct {
		Semestre         string `json:"semestre"`
		PeriodoAcademico int    `json:"periodo_academico"`
		ProgramaID       int    `json:"programa_id"`
	}
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	query := `
		SELECT
		E."Identificacion",
		E."Nombres",
		COUNT(CASE WHEN NOT N."Gano" = 1 THEN 1 END) AS "Perdio",
		COUNT(CASE WHEN N."Gano" = 1 THEN 1 END) AS "Gano",
		COUNT(N."Nota") AS "CantidadMaterias",
		CASE
			WHEN COUNT(N."Nota") > 0 THEN
				ROUND((COUNT(CASE WHEN NOT N."Gano" = 1 THEN 1 END) * 100.0) / COUNT(N."Nota"))
			ELSE
				0
		END AS "PorcentajePerdida"
		FROM PUBLIC."Notas" N
		JOIN PUBLIC."Estudiantes" E ON E.ID = N."EstudianteId"
		WHERE N."PeriodoAcademicoId" =$1 AND N."ProgramaId" =$2 AND E."SemeNumero" =$3
		GROUP BY E."Identificacion",E."Nombres"
		ORDER BY  "Perdio" DESC
	`
	args := []interface{}{params.PeriodoAcademico, params.ProgramaID, params.Semestre}

	// Ejecutar la consulta SQL
	rows, err := Database.Query(query, args...)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	type Resultado struct {
		Identificacion    string `json:"identificacion"`
		Nombres           string `json:"nombres"`
		Perdio            int    `json:"perdio"`
		Gano              int    `json:"gano"`
		CatidadMaterias   int    `json:"cantidad_materias"`
		PorcentajePerdida int    `json:"porcentaje_perdida"`
	}

	estudiantes := []Resultado{}

	for rows.Next() {
		var identificacion string
		var nombres string
		var perdio int
		var gano int
		var cantidad_materias int
		var porcentaje_perdida int

		err = rows.Scan(&identificacion, &nombres, &perdio, &gano, &cantidad_materias, &porcentaje_perdida)
		if err != nil {
			log.Fatal(err)
		}

		estudiante := Resultado{
			Identificacion:    identificacion,
			Nombres:           nombres,
			Perdio:            perdio,
			Gano:              gano,
			CatidadMaterias:   cantidad_materias,
			PorcentajePerdida: porcentaje_perdida,
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

}

func Materia_Estudiantes(w http.ResponseWriter, r *http.Request) {
	// Leer los parámetros de la solicitud
	var params struct {
		Semestre         string `json:"semestre"`
		PeriodoAcademico int    `json:"periodo_academico"`
		ProgramaID       int    `json:"programa_id"`
	}
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Preparar la consulta SQL con los parámetros
	query := `
	SELECT
	E."Identificacion",
	E."people_code_id",
	E."Nombres",
	E."Email",
	E."TelMovil",
	E."TelFijo",
	E."Direccion",
	M."CodigoMateria",
	M."NombreMateria" AS Materia,
	M."TipoMateria",
	D."Cog_Docente",
	D."Nom_Docente",
	MP."SemMateriaNum" AS Semestre,
	N."Nota"
	FROM PUBLIC."Notas" N
	JOIN PUBLIC."Estudiantes" E ON E.ID = N."EstudianteId"
	JOIN PUBLIC."Materias" M ON M.ID = N."MateriaId"
	JOIN PUBLIC."Docentes" D ON D.id = N."DocenteId"
	JOIN public."Pensums" ON "Pensums".id = E."PensumId"
	JOIN public."MateriaPorPensums" MP ON MP."MateriaId" = M.id AND MP."PensumId" = "Pensums".id
	WHERE N."PeriodoAcademicoId"=$1 AND N."ProgramaId"=$2 AND E."SemeNumero"=$3;
	`
	args := []interface{}{params.PeriodoAcademico, params.ProgramaID, params.Semestre}

	// Ejecutar la consulta SQL
	rows, err := Database.Query(query, args...)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	// Crear una estructura para almacenar los resultados
	type Resultado struct {
		Identificacion string `json:"identificacion"`
		PeopleCodeID   string `json:"people_code_id"`
		Nombres        string `json:"nombres"`
		Email          string `json:"email"`
		TelMovil       string `json:"tel_movil"`
		TelFijo        string `json:"tel_fijo"`
		Direccion      string `json:"direccion"`
		CodMateria     string `json:"cod_materia"`
		Materia        string `json:"materia"`
		TipoMateria    string `json:"tipo_materia"`
		CogDocente     string `json:"cog_docente"`
		NomDocente     string `json:"nom_docente"`
		Semestre       string `json:"semestre"`
		Nota           string `json:"nota"`
	}
	estudiantes := []Resultado{}

	for rows.Next() {
		var identificacion string
		var people_code_id string
		var nombres string
		var email string
		var tel_movil string
		var tel_fijo string
		var direccion string
		var materia string
		var codmateria string
		var tipo_materia string
		var cog_docente string
		var nom_docente string
		var semestre string
		var nota string

		err = rows.Scan(&identificacion, &people_code_id, &nombres, &email, &tel_movil, &tel_fijo, &direccion, &codmateria, &materia, &tipo_materia, &cog_docente, &nom_docente, &semestre, &nota)
		if err != nil {
			log.Fatal(err)
		}

		estudiante := Resultado{
			Identificacion: identificacion,
			PeopleCodeID:   people_code_id,
			Nombres:        nombres,
			Email:          email,
			TelMovil:       tel_movil,
			TelFijo:        tel_fijo,
			Direccion:      direccion,
			CodMateria:     codmateria,
			Materia:        materia,
			TipoMateria:    tipo_materia,
			CogDocente:     cog_docente,
			NomDocente:     nom_docente,
			Semestre:       semestre,
			Nota:           nota,
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

}
