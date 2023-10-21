package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/xuri/excelize/v2"
)

type Datos struct {
	CIUDAD               string `json:"CIUDAD"`
	CodigoMateria        string `json:"CodigoMateria"`
	CogDocente           string `json:"CogDocente"`
	Contar               string `json:"Contar"`
	DEPARTAMENTO         string `json:"DEPARTAMENTO"`
	DIRECCION            string `json:"DIRECCION"`
	EMAIL                string `json:"EMAIL"`
	EstadoAlumnoPrograma string `json:"EstadoAlumnoPrograma"`
	FINAL_GRADE          string `json:"FINAL_GRADE"`
	Facultad             string `json:"Facultad"`
	GRADE_ACTIVITY       string `json:"GRADE_ACTIVITY"`
	GRADE_POINTS         string `json:"GRADE_POINTS"`
	Gano                 string `json:"Gano"`
	Genero               string `json:"Genero"`
	Identificacion       string `json:"Identificacion"`
	NomDocente           string `json:"NomDocente"`
	NombreMateria        string `json:"NombreMateria"`
	Nombres              string `json:"Nombres"`
	Nota1                string `json:"Nota1"`
	Perdio               string `json:"Perdio"`
	Periodo              string `json:"Periodo"`
	ProgramaEstudiante   string `json:"ProgramaEstudiante"`
	ProgramaMateria      string `json:"ProgramaMateria"`
	ProxNotaMin          string `json:"ProxNotaMin"`
	Rango                string `json:"Rango"`
	Seccion              string `json:"Seccion"`
	SemMateriaNum        string `json:"SemMateriaNum"`
	SemNumero            string `json:"SemNumero"`
	Semestre             string `json:"Semestre"`
	Sesion               string `json:"Sesion"`
	TelFijo              string `json:"TelFijo"`
	TelMovil             string `json:"TelMovil"`
	TipoDoc              string `json:"TipoDoc"`
	TipoMateria          string `json:"TipoMateria"`
	Anio                 string `json:"Anio"`
	PeopleCodeID         string `json:"PeopleCodeID"`
	Sede                 string `json:"Sede"`
	Seme                 string `json:"Seme"`
}
type Facultad struct {
	NombreFacultad string
}

type Programa struct {
	NombrePrograma string
	Sede           string
	Sesion         string
	NombreFacultad string
}

type Pensum struct {
	Pensum         string
	Semestres      string
	NombrePrograma string
	Sede           string
}

type Estudiante struct {
	PeopleCodeID         string
	TipoDoc              string
	Identificacion       string
	Nombres              string
	EstadoAlumnoPrograma string
	Semestre             string
	Direccion            string
	Ciudad               string
	Departamento         string
	TelFijo              string
	TelMovil             string
	Email                string
	Genero               string
	SemeNumero           string
	Pensum               string
}

type Materia struct {
	NombreMateria string
	CodigoMateria string
	TipoMateria   string
}

type MateriaPensum struct {
	NombreMateria string
	CodigoMateria string
	Pensum        string
	Semestres     string
	SemMateriaNum string
	Seme          string
}

type Docente struct {
	CogDocente string
	NomDocente string
}

type Periodo struct {
	Periodo        string
	Anio           string
	NomNotaPeriodo string
}

type Nota struct {
	GradeActivity  string
	FinalGrade     string
	Nota           string
	Gano           int
	Perdio         int
	Rango          string
	ProxNotaMin    string
	Seccion        string
	NombrePrograma string
	Sede           string
	CodigoMateria  string
	Identificacion string
	CogDocente     string
	NomDocente     string
	Periodo        string
	Año            string
	NomNotaPeriodo string
}

func uploadFileHandler(w http.ResponseWriter, r *http.Request) {

	// Parsear el formulario con un límite razonable (en bytes)
	err := r.ParseMultipartForm(20 << 30)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Obtener el archivo del formulario
	file, fileInfo, err := r.FormFile("file")

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	uploadDir := "./uploads/"

	uploadPath := filepath.Join(uploadDir, fileInfo.Filename)

	f, err := os.OpenFile(uploadDir+fileInfo.Filename, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer file.Close()
	// Copiar el archivo al disco
	io.Copy(f, file)

	xlsx, err := excelize.OpenFile(uploadPath)
	if err != nil {
		log.Fatal(err)
	}

	// Leer los datos de la hoja "Data"
	rows, err := xlsx.GetRows("Data")

	if err != nil {
		log.Fatal(err)
	}

	os.Remove(uploadPath)

	var jsonData []map[string]string
	columns := rows[0]

	for i := 1; i < len(rows); i++ {
		row := rows[i]
		entry := make(map[string]string)

		for j := 0; j < len(columns); j++ {
			entry[columns[j]] = row[j]
		}

		jsonData = append(jsonData, entry)
	}

	jsonBytes, err := json.Marshal(jsonData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	/* facultad := []Facultad{}
	programa := []Programa{}
	pensum := []Pensum{}
	estudiante := []Estudiante{}
	materia := []Materia{}
	materiaPensum := []MateriaPensum{}
	docente := []Docente{}
	periodo := []Periodo{}
	nota := []Nota{} */

	w.Write(jsonBytes)
}
