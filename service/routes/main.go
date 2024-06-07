package routes

import (
	"database/sql"

	"github.com/Carjul/api_rest_go/controllers"
	"github.com/gorilla/mux"
)


func Routes(app *mux.Router, Database *sql.DB) {
	controllers.Database = Database
	app.HandleFunc("/service", controllers.Init).Methods("GET")
	app.HandleFunc("/service/upload", controllers.UploadFileHandler).Methods("POST")
	app.HandleFunc("/service/notas", controllers.GetNotas).Methods("POST")
	app.HandleFunc("/service/notas/rango", controllers.Nota_Rango).Methods("POST")
	app.HandleFunc("/service/Notas_periodo_sem", controllers.NotasPeriodoSem).Methods("POST")
	app.HandleFunc("/service/Notas_periodo", controllers.NotasPeriodo).Methods("POST")
	app.HandleFunc("/service/Notas_Facultades", controllers.Notas_facultades).Methods("GET")
	app.HandleFunc("/service/Notas_Facultad", controllers.Notas_facultad).Methods("POST")
	app.HandleFunc("/service/datosEst", controllers.Datos_Estudiante).Methods("GET")
	app.HandleFunc("/service/datosDoc", controllers.DataDocente).Methods("GET")
	app.HandleFunc("/service/semestres", controllers.GetSemestres).Methods("POST")
	app.HandleFunc("/service/EstSemestres", controllers.Semestre_Estudiante).Methods("POST")
	app.HandleFunc("/service/Materias", controllers.GetMaterias).Methods("POST")
	app.HandleFunc("/service/EstMateria", controllers.Materia_Estudiantes).Methods("POST")
}
