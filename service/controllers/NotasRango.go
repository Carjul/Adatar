package controllers

import (
	"encoding/json"
	"log"
	"net/http"
)

func Nota_Rango(w http.ResponseWriter, r *http.Request) {

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
JOIN public."PeriodoAcademicos" pa ON pa.id = n."PeriodoAcademicoId"
JOIN Public."Programas" p ON p.id = n."ProgramaId"
WHERE P.id= $1 AND pa.id= $2
ORDER BY Semestres ASC;`
	args := []interface{}{params.ProgramaID, params.Periodo}

	rows, err := Database.Query(query, args...)
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

}
