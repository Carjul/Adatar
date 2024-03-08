package db

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var num int = 0

func InitDB() *sql.DB {

	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	DB_NAME := os.Getenv("DB")

	Db, err := sql.Open("postgres", `postgres://`+user+`:`+password+`@`+host+`/`+DB_NAME+`?sslmode=disable`)
	if err != nil {
		log.Println("Error al conectarse a la base de datos:", err)

	}

	// Verificación de la conexión
	err = Db.Ping()
	if err != nil {
		log.Println("No se pudo establecer conexión con la base de datos:", err)
	}
	if num == 0 {
		log.Println("base de datos" + " " + DB_NAME + " " + "conectada con éxito")
		num++
	}
	return Db
}
