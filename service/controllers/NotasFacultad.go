package controllers

import (
	"encoding/json"
	"log"
	"net/http"

)

func Notas_facultades(w http.ResponseWriter, r *http.Request) {

	queryParam := r.URL.Query()
	periodo := queryParam.Get("NomNotaPeriodo")

	if periodo == "" {
		http.Error(w, "El parámetro 'NomNotaPeriodo' es obligatorio", http.StatusBadRequest)
		return
	}

	query := `SELECT COUNT(*) AS value, n."Rango" AS name
	  FROM Public."Notas" n
	  JOIN Public."PeriodoAcademicos" pa ON pa.id = n."PeriodoAcademicoId"
	  JOIN public."Programas" p ON p.id = n."ProgramaId"
	  JOIN public."Facultades" f ON p."FacultadeId" = f.id 
	  WHERE pa."NomNotaPeriodo" = $1
	  GROUP BY n."Rango";`
	args := []interface{}{periodo}

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

func Notas_facultad(w http.ResponseWriter, r *http.Request) {

	var params struct {
		ProgramaID string `json:"facultad_id"`
		PeriodoID  string `json:"periodo_id"`
	}

	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()
	if err := decoder.Decode(&params); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := `SELECT  COUNT(*) AS value ,n."Rango" AS name
	FROM Public."Notas" n
	JOIN Public."PeriodoAcademicos" pa ON pa.id = n."PeriodoAcademicoId"
	JOIN public."Programas" p ON p.id = n."ProgramaId"
	JOIN public."Facultades" f ON p."FacultadeId"=f.id
	WHERE f.id = $1 AND pa.id=$2
	GROUP BY n."Rango";`

	args := []interface{}{params.ProgramaID, params.PeriodoID}
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
