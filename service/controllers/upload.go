package controllers

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/xuri/excelize/v2"
)

/*
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
*/
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
	FINAL_GRADE          string
	GRADE_ACTIVITY       string
	GRADE_POINTS         string
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
	Gano           string
	Perdio         string
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

func UploadFileHandler(w http.ResponseWriter, r *http.Request) {

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

	var facultad Facultad
	var programa Programa
	var pensum Pensum
	var estudiante Estudiante
	var materia Materia
	var materiaPensum MateriaPensum
	var docente Docente
	var periodo Periodo
	var nota Nota

	for _, row := range rows {

		for idx, value := range row {
			switch idx {
			case 0:
				estudiante.Ciudad = value
			case 1:
				materia.CodigoMateria = value
				materiaPensum.CodigoMateria = value
				nota.CodigoMateria = value
			case 2:
				docente.CogDocente = value
			/* case 3:
			dato.Contar = value */
			case 4:
				estudiante.Departamento = value
			case 5:
				estudiante.Direccion = value
			case 6:
				estudiante.Email = value
			case 7:
				estudiante.EstadoAlumnoPrograma = value
			case 8:
				estudiante.FINAL_GRADE = value
			case 9:
				programa.NombreFacultad = value
				facultad.NombreFacultad = value
			case 10:
				estudiante.GRADE_ACTIVITY = value
			case 11:
				estudiante.GRADE_POINTS = value
			case 12:
				nota.Gano = value
			case 13:
				estudiante.Genero = value
			case 14:
				estudiante.Identificacion = value
				nota.Identificacion = value
			case 15:
				docente.NomDocente = value
			case 16:
				materia.NombreMateria = value
				materiaPensum.NombreMateria = value
			case 17:
				estudiante.Nombres = value
			case 18:
				nota.Nota = value
			case 19:
				nota.Perdio = value
			case 20:
				nota.Periodo = value
				periodo.Periodo = value
			case 21:
				pensum.NombrePrograma = value
			case 22:
				materiaPensum.NombreMateria = value
			case 23:
				nota.ProxNotaMin = value
			case 24:
				nota.Rango = value
			case 25:
				nota.Seccion = value
			case 26:
				materiaPensum.SemMateriaNum = value
			case 27:
				pensum.Semestres = value
			case 28:
				estudiante.Semestre = value

			case 29:
				programa.Sesion = value
			case 30:
				estudiante.TelFijo = value
			case 31:
				estudiante.TelMovil = value
			case 32:
				estudiante.TipoDoc = value
			case 33:
				materia.TipoMateria = value
			case 34:
				periodo.Anio = value
			case 35:
				estudiante.PeopleCodeID = value
			case 36:
				nota.Sede = value
				programa.Sede = value
				pensum.Sede = value
			case 37:

				materiaPensum.Seme = value
			}
		}

		// Agrega el dato a la lista de datos
		fmt.Println(estudiante)
		fmt.Println(materia)
		fmt.Println(materiaPensum)
		fmt.Println(docente)
		fmt.Println(periodo)
		fmt.Println(nota)

	}

	w.Write([]byte("File uploaded successfully"))
}
