package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{} // use default options
func Echo(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
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
	http.HandleFunc("/echo", Echo)
	go NotifyClient()
	if err := http.ListenAndServe(":1234", nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
