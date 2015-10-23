package main

import (
	"encoding/json"
	"fmt"
	"sync"
	"time"

	"golang.org/x/net/websocket"
)

var (
	conns []*Session
	mutex *sync.Mutex
)

func init() {
	conns = make([]*Session, 0)
	mutex = new(sync.Mutex)
}

func NewSession(ws *websocket.Conn) *Session {
	session := &Session{
		Conn:      ws,
		SendQueue: make(chan ResponseData, 10),
		Quit:      false,
	}
	mutex.Lock()
	defer mutex.Unlock()
	conns = append(conns, session)
	session.Index = len(conns)
	return session
}

func DelSession(session *Session) {
	mutex.Lock()
	mutex.Unlock()
	conns = append(conns[:session.Index-1], conns[session.Index:]...)
}

type ResponseData struct {
	Opt     int         `json:"opt"`
	Success bool        `json:"success"`
	Msg     interface{} `json:"msg"`
}

type Session struct {
	Conn      *websocket.Conn
	SendQueue chan ResponseData
	Quit      bool
	Index     int
}

func (session *Session) Close() {
	session.Quit = true
	session.Conn.Close()
}

func (session *Session) handler() {
	var err error
	for !session.Quit {
		var reply string
		if err = websocket.Message.Receive(session.Conn, &reply); err != nil {
			fmt.Println("Can't receive")
			session.Close()
			break
		}
		fmt.Println("Receive Message", reply)
		var msg ResponseData
		if err = json.Unmarshal([]byte(reply), &msg); err != nil {
			fmt.Println(err.Error())
			session.Close()
			break
		}
		session.SendQueue <- msg
	}
}

func (session *Session) Send() {
	var err error
	for !session.Quit {
		select {
		case msg := <-session.SendQueue:
			fmt.Println("Sending to client: ", msg)
			var result []byte
			if result, err = json.Marshal(&msg); err != nil {
				fmt.Println("json.Marshal error", err.Error())
				session.Close()
				break
			}
			if err = websocket.Message.Send(session.Conn, string(result)); err != nil {
				fmt.Println("Can't send")
				session.Close()
				break
			}
		}
	}
}

func NotifyClient() {
	for {
		select {
		case <-time.After(10 * time.Second):
			for k, v := range conns {
				v.SendQueue <- ResponseData{
					Opt:     1,
					Success: true,
					Msg:     fmt.Sprintf("你是第%d位接收者", k),
				}
			}
		}
	}
}
