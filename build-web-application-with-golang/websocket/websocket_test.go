package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	"net/url"
	"runtime"
	"sync"
	"testing"

	"github.com/gorilla/websocket"
	. "github.com/smartystreets/goconvey/convey"
)

var (
	wg         sync.WaitGroup
	once       sync.Once
	serverAddr string
)

func startServer() {
	http.HandleFunc("/echo", Echo)
	go NotifyClient()
	server := httptest.NewServer(nil)
	serverAddr = server.Listener.Addr().String()
	log.Print("Test WebSocket server listening on ", serverAddr)
}

func newClient(t *testing.T) {
	defer wg.Done()
	u := url.URL{Scheme: "ws", Host: serverAddr, Path: "/echo"}
	log.Printf("connecting to %s", u.String())

	conn, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	Convey("new ws connection success", t, func() {
		So(err, ShouldBeNil)
	})
	defer conn.Close()

	close := make(chan bool)
	var send = func() {
		for i := 0; i < 100; i++ {
			msg := ResponseData{
				Opt:     i,
				Success: true,
				Msg:     fmt.Sprintf("发送第%d次数据", i),
			}

			Convey("Send Message Success", t, func() {
				err := conn.WriteJSON(msg)
				So(err, ShouldBeNil)
			})
			runtime.Gosched()
		}
	}
	var receive = func(ch chan bool) {
		i := 0
		for i < 2 {
			_, message, err := conn.ReadMessage()
			Convey("Read Message Success", t, func() {
				So(err, ShouldBeNil)
			})

			Convey("Check Result", t, func() {
				var v ResponseData
				err = json.Unmarshal(message, &v)
				So(err, ShouldBeNil)
				So(v.Success, ShouldBeTrue)
				log.Printf("recv: %s", message)
			})
			i++
			runtime.Gosched()
		}
		ch <- true
	}
	go send()
	go receive(close)
	<-close
}

func TestConcurrency(t *testing.T) {
	once.Do(startServer)
	for i := 0; i < 2; i++ {
		wg.Add(1)
		go newClient(t)
	}
	wg.Wait()
}
