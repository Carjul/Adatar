package controllers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

var Database *sql.DB

func GetNotas(w http.ResponseWriter, r *http.Request) {

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
	SELECT e.id AS estudiante_id, e."Nombres" AS estudiante_nombre, m."SemMateriaNum" AS semestre, n."Nota", n."ProxNotaMin"
	FROM Public."Estudiantes" e
	JOIN Public."Notas" n ON e.id = n."EstudianteId"
	JOIN public."MateriaPorPensums" m ON n."MateriaId" = m."MateriaId" AND n."MateriaId" = m."MateriaId"
	WHERE m."SemMateriaNum"=$1 AND n."Perdio" =1 AND n."PeriodoAcademicoId"=$2 AND n."ProgramaId"=$3
	`
	args := []interface{}{params.Semestre, params.PeriodoAcademico, params.ProgramaID}

	// Ejecutar la consulta SQL
	rows, err := Database.Query(query, args...)
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

}
