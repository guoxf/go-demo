package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"

	"golang.org/x/net/websocket"
)

func Echo(ws *websocket.Conn) {
	fmt.Println("start websocket!")
	session := NewSession(ws)
	defer func() {
		DelSession(session)
		fmt.Println("close websocket!")
	}()
	go session.Send()
	session.handler()
}

func index(w http.ResponseWriter, res *http.Request) {
	t, _ := template.ParseFiles("index.html")
	t.Execute(w, nil)
}

func main() {
	http.HandleFunc("/", index)
	http.Handle("/echo", websocket.Handler(Echo))
	go NotifyClient()
	if err := http.ListenAndServe(":1234", nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
