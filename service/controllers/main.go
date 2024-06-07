package controllers

import (
	"net/http"
)

func Init(w http.ResponseWriter, r *http.Request) { w.Write([]byte("Servicio iniciado")) }
