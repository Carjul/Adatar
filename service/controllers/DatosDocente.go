package controllers

import (
	"encoding/json"
	"log"
	"net/http"
)

func DataDocente(w http.ResponseWriter, r *http.Request) {
	
	queryParams := r.URL.Query()
	DocenteID := queryParams.Get("Cog_Docente")

	if DocenteID == "" {
		http.Error(w, "El parámetro Cog_Docente es obligatorio", http.StatusBadRequest)
		return
	}
	queryDocente := `SELECT D."Cog_Docente",
		D."Nom_Docente",
		"Programas"."NombrePrograma",
		"Materias"."NombreMateria",
		"Notas"."Nota",
		"PeriodoAcademicos"."Year",
		"Notas"."EstudianteId"
	FROM PUBLIC."Docentes" AS D
	JOIN PUBLIC."Notas" ON "Notas"."DocenteId" = D.ID
	JOIN PUBLIC."Materias" ON "Materias".ID = "Notas"."MateriaId"
	JOIN PUBLIC."PeriodoAcademicos" ON "PeriodoAcademicos".ID = "Notas"."PeriodoAcademicoId"
	JOIN PUBLIC."Programas" ON "Programas".ID = "Notas"."ProgramaId"
	WHERE D."Cog_Docente"=$1`

	args := []interface{}{DocenteID}

	rows, err := Database.Query(queryDocente, args...)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	type Resultado struct {
		Cog_Docente    string `json:"Cog_Docente"`
		Nom_Docente    string `json:"Nombres"`
		NombrePrograma string `json:"NombrePrograma"`
		NombreMateria  string `json:"NombreMateria"`
		Nota           string `json:"Nota"`
		Year           int    `json:"Year"`
		EstudianteId   string `json:"Estudiante_id"`
	}

	notasDoc := []Resultado{}

	for rows.Next() {
		var Cog_Docente string
		var Nom_Docente string
		var NombrePrograma string
		var NombreMateria string
		var Nota string
		var Year int
		var EstudianteId string

		err = rows.Scan(&Cog_Docente, &Nom_Docente, &NombrePrograma, &NombreMateria, &Nota, &Year, &EstudianteId)
		if err != nil {
			log.Fatal(err)
		}

		notasDoc = append(notasDoc, Resultado{Cog_Docente: Cog_Docente, Nom_Docente: Nom_Docente, NombrePrograma: NombrePrograma, NombreMateria: NombreMateria, Nota: Nota, Year: Year, EstudianteId: EstudianteId})

	}

	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(notasDoc)

}
