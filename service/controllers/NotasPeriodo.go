package controllers

import (
	"encoding/json"
	"log"
	"net/http"
)
func NotasPeriodoSem(w http.ResponseWriter, r *http.Request) {


	var params struct {
		ProgramaID string `json:"programa_id"`
		Semestre  string  `json:"semestre"`
		Periodo    int    `json:"periodo_academico"`
	}

	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()
	if err := decoder.Decode(&params); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := `SELECT  COUNT(*) AS value ,n."Rango" AS name
	FROM Public."Notas" n
	JOIN Public."PeriodoAcademicos" ON "PeriodoAcademicos".id = n."PeriodoAcademicoId"
	JOIN Public."MateriaPorPensums" m ON m."MateriaId" = n."MateriaId"
	WHERE n."ProgramaId" =$1 AND m."SemMateriaNum"=$2 AND "PeriodoAcademicos".id=$3
	GROUP BY n."Rango";`

	args := []interface{}{params.ProgramaID,params.Semestre, params.Periodo}
	rows, err := Database.Query(query, args...)
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

}

func NotasPeriodo(w http.ResponseWriter, r *http.Request) {

	var params struct {
		ProgramaID string `json:"programa_id"`
		Periodo    int    `json:"periodo_academico"`
	}

	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()
	if err := decoder.Decode(&params); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := `SELECT  COUNT(*) AS value ,n."Rango" AS name
	FROM Public."Notas" n
	JOIN public."PeriodoAcademicos" ON "PeriodoAcademicos".id = n."PeriodoAcademicoId"
	WHERE n."ProgramaId" =$1 AND "PeriodoAcademicos".id=$2
	GROUP BY n."Rango";`

	args := []interface{}{params.ProgramaID, params.Periodo}
	rows, err := Database.Query(query, args...)
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

}
