package main

import (
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

func newSession(ws *websocket.Conn) *Session {
	session := &Session{
		Conn:      ws,
		SendQueue: make(chan string, 10),
		Quit:      false,
	}
	mutex.Lock()
	defer mutex.Unlock()
	conns = append(conns, session)
	session.Index = len(conns)
	return session
}

func delSession(session *Session) {
	mutex.Lock()
	mutex.Unlock()
	conns = append(conns[:session.Index-1], conns[session.Index:]...)
}

type ResponseData struct {
	Opt     int    `json:"opt"`
	Success bool   `json:"success"`
	Msg     string `json:"msg"`
}
type Session struct {
	Conn      *websocket.Conn
	SendQueue chan string
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
		session.SendQueue <- reply
	}
}

func (session *Session) Send() {
	var err error
	for !session.Quit {
		select {
		case msg := <-session.SendQueue:
			msg = "Received: " + msg
			fmt.Println("Sending to client: ", msg)
			if err = websocket.Message.Send(session.Conn, msg); err != nil {
				fmt.Println("Can't send")
				session.Close()
				break
			}
		}
	}
}

func notifyClient() {
	for {
		select {
		case <-time.After(10 * time.Second):
			for k, v := range conns {
				if err := websocket.Message.Send(v.Conn, fmt.Sprintf("你是第%d位接收者", k)); err != nil {
					fmt.Printf("发送给第%d位失败，失败原因%s。", k, err.Error())
				}
			}
		}
	}
}
