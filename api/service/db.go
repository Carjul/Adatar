package main

import (
	"database/sql"
	"log"
	"os"

	"github.com/joho/godotenv"

	_ "github.com/lib/pq"
)

func InitDB() *sql.DB {

	loadEnv()
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	DB_NAME := os.Getenv("DB")

	db, err := sql.Open("postgres", `postgres://`+user+`:`+password+`@`+host+`/`+DB_NAME+`?sslmode=disable`)
	if err != nil {
		log.Println("Error al conectarse a la base de datos:", err)

	}

	// Verificación de la conexión
	err = db.Ping()
	if err != nil {
		log.Println("No se pudo establecer conexión con la base de datos:", err)
	}
	log.Println("base de datos" + " " + DB_NAME + " " + "conectada con éxito")
	return db
}

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}
