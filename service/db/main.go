package db

import (
	"database/sql"
	"io/ioutil"
	"log"
	"os"

	_ "github.com/lib/pq"
)

func InitDB() *sql.DB {
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	DB_NAME := os.Getenv("DB")

	Db, err := sql.Open("postgres", `postgres://`+user+`:`+password+`@`+host+`/`+DB_NAME+`?sslmode=disable`)
	if err != nil {
		log.Println("Error al conectarse a la base de datos:", err)
		return nil
	}

	// Verificación de la conexión
	err = Db.Ping()
	if err != nil {
		log.Println("No se pudo establecer conexión con la base de datos:", err)
		return nil
	} else {
		log.Println("Base de datos " + DB_NAME + " conectada con éxito")
	}

	// Restaurar base de datos desde el archivo SQL
	restoreDatabase(Db)
	// Insertar datos iniciales}
	insertInitialData(Db)

	return Db
}

func restoreDatabase(Db *sql.DB) {
	dir, err := os.Getwd()
	if err != nil {
		log.Println("Error obteniendo el directorio actual:", err)
		return
	}

	// Leer el archivo SQL
	sqlFile, err := ioutil.ReadFile(dir + "/db/adatar.sql")
	if err != nil {
		log.Println("Error al leer el archivo SQL:", err)
		return
	}

	// Ejecutar las consultas del archivo SQL
	_, err = Db.Exec(string(sqlFile))
	if err != nil {
		log.Println("Error al ejecutar el SQL:", err)
	} else {
		log.Println("Base de datos restaurada con éxito desde el archivo SQL.")
	}
}

func insertInitialData(db *sql.DB) {
	// Sentencia SQL para insertar los roles y el usuario inicial
	query := `
		-- Insertar roles en la tabla Rols
		INSERT INTO public."Rols" (id, rol) VALUES
		(1, 'Admin'),
		(2, 'Directivo'),
		(3, 'Coordinador de semestre'),
		(4, 'Docente'),
		(5, 'Estudiante'),
		(6, 'Visitante')
		ON CONFLICT (id) DO NOTHING;

		INSERT INTO public."Users" (id, "Avatar", "Nombre", "Password", "Email", "RolId") VALUES
		(1, 'https://lh3.googleusercontent.com/a/ACg8ocIWLEt0bdA6AXvNFm_EV4HlU6nhruO_7R5OPnfSuV2LOaL3qwyd=s288-c-no', 'Carlos Julian', 'cramosgonzales', 'cramosgonzales@correo.unicordoba.edu.co', 1)
		ON CONFLICT (id) DO NOTHING;
	`

	// Ejecutar la consulta SQL
	_, err := db.Exec(query)
	if err != nil {
		log.Println("Error al insertar los datos iniciales:", err)
	} else {
		log.Println("Datos iniciales insertados correctamente.")
	}
}
