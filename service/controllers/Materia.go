package controllers

import (
	"encoding/json"
	"log"
	"net/http"
)

func GetMaterias(w http.ResponseWriter, r *http.Request) {

	var params struct {
		Programa_ID int    `json:"programa_id"`
		Semestre    string `json:"semestre"`
		Periodo     int    `json:"periodo_academico"`
	}

	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()
	if err := decoder.Decode(&params); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := `SELECT  n."MateriaId", "Materias"."NombreMateria",
	COUNT(CASE WHEN n."Gano" = 1 THEN 1 END) AS "Gano",
	COUNT(CASE WHEN NOT n."Gano" = 1 THEN 1 END) AS "Perdio" FROM Public."Programas"
	JOIN public."Pensums" ON "Pensums"."ProgramaId" = "Programas".id
	JOIN public."MateriaPorPensums" ON "MateriaPorPensums"."PensumId" = "Pensums".id
	JOIN public."Materias" ON "Materias".id = "MateriaPorPensums"."MateriaId"
	JOIN public."Notas" n ON n."MateriaId" = "Materias".id
	JOIN public."PeriodoAcademicos" ON "PeriodoAcademicos".id = n."PeriodoAcademicoId"
	WHERE "Programas".id= $1 AND "MateriaPorPensums"."SemMateriaNum"= $2 AND "PeriodoAcademicos".id= $3
	GROUP BY n."MateriaId", "Materias"."NombreMateria"
	`
	args := []interface{}{params.Programa_ID, params.Semestre, params.Periodo}
	rows, err := Database.Query(query, args...)
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

}
