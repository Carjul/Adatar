package controllers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

func GetSemestres(w http.ResponseWriter, r *http.Request) {

	var params struct {
		ProgramaID string `json:"programa_id"`
	}
	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()
	if err := decoder.Decode(&params); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	query := `SELECT DISTINCT "MateriaPorPensums"."SemMateriaNum" semestres FROM Public."Programas" p
JOIN public."Pensums" ON "Pensums"."ProgramaId" = p.id
JOIN public."MateriaPorPensums" ON "MateriaPorPensums"."PensumId" = "Pensums".id
WHERE p.id=$1`
	args := []interface{}{params.ProgramaID}
	rows, err := Database.Query(query, args...)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	semestres := make([]string, 0)

	for rows.Next() {
		var semestre sql.NullString

		err = rows.Scan(&semestre)
		if err != nil {
			log.Fatal(err)
		}

		if semestre.Valid {
			semestres = append(semestres, semestre.String)
		}
	}

	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}

	semestresJSON, err := json.Marshal(semestres)
	if err != nil {
		log.Fatal(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(semestresJSON)

}
