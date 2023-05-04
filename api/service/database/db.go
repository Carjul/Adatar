package db

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() {
	var err error
	DB, err = sql.Open("postgres", "postgres://admin:12345@172.17.0.1/adatar?sslmode=disable")
	if err != nil {
		log.Fatal(err)
	} else if err = DB.Ping(); err != nil {
		log.Println("Conexión exitosa a la base de datos")
	}
	defer DB.Close()

}
