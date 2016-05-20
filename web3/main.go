package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("hello Web3! This is n3")
	fmt.Fprintf(w, "Hello Web3! This is n3")
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("health check!")
}

func main() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/health", healthHandler)
	http.ListenAndServe(":10000", nil)
}
