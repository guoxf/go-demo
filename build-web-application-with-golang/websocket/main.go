package main

import(
	"code.google.com/p/go.net/websocket"
	"fmt"
	"log"
	"net/http"
	"html/template"
)

func Echo(ws *websocket.Conn){
	var err error
	
	for{
		var reply string
		
		if err=websocket.Message.Receive(ws,&reply);err!=nil{
			fmt.Println("Can't receive")
			break
		}
		
		fmt.Println("Received back from client: ",reply)
		
		msg:="Received: "+reply
		fmt.Println("Sending to client: ",msg)
		if err=websocket.Message.Send(ws,msg);err!=nil{
			fmt.Println("Can't send")
			break
		}
	}
}
func index(w http.ResponseWriter,res *http.Request){
	t, _ := template.ParseFiles("index.html")
	t.Execute(w, nil)
}
func main(){
	http.HandleFunc("/",index)
	http.Handle("/echo",websocket.Handler(Echo))
	
	if err:=http.ListenAndServe(":1234",nil);err!=nil{
		log.Fatal("ListenAndServe:",err)
	}
}