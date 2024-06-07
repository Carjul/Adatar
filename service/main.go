package main

import (
	"log"
	"net/http"

	"github.com/Carjul/api_rest_go/db"
	"github.com/Carjul/api_rest_go/routes"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

func main() {
	errEnv := godotenv.Load()

	if errEnv != nil {
		log.Fatal("Error loading .env file")
	}

	Database := db.InitDB()
	defer Database.Close()

	app := mux.NewRouter()

	// Rutas
	routes.Routes(app, Database)

	// Configurar el middleware CORS
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Accept", "Content-Type", "Content-Length", "Accept-Encoding", "Authorization"},
	})

	// Envolver el enrutador con el middleware CORS
	router := c.Handler(app)

	// Iniciar el servidor HTTP
	err := http.ListenAndServe(":8000", router)

	if err != nil {
		log.Fatal("Error al iniciar el servidor: ", err)
	}

}
