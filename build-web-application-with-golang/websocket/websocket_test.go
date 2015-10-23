package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
	"net/http/httptest"
	"runtime"
	"sync"
	"testing"

	"golang.org/x/net/websocket"
)

var (
	wg         sync.WaitGroup
	once       sync.Once
	serverAddr string
)

func startServer() {
	http.Handle("/echo", websocket.Handler(Echo))
	go NotifyClient()
	server := httptest.NewServer(nil)
	serverAddr = server.Listener.Addr().String()
	log.Print("Test WebSocket server listening on ", serverAddr)
}

func newClient(t *testing.T) {
	wg.Add(1)
	defer wg.Done()
	client, err := net.Dial("tcp", serverAddr)
	if err != nil {
		t.Error(err.Error())
		return
	}

	conn, err := websocket.NewClient(newConfig(t, "/echo"), client)
	if err != nil {
		t.Error(err.Error())
		return
	}
	defer conn.Close()

	close := make(chan bool)
	var send = func() {
		for i := 0; i < 100; i++ {
			msg := ResponseData{
				Opt: i,
				Msg: fmt.Sprintf("发送第%d次数据", i),
			}
			if b, err := json.Marshal(&msg); err != nil {
				fmt.Println(err.Error())
				break
			} else if _, err = conn.Write(b); err != nil {
				fmt.Println(err.Error())
				break
			}
			runtime.Gosched()
		}
	}
	var receive = func(ch chan bool) {
		i := 0
		actual_msg := make([]byte, 502)
		for i < 100 {
			_, err := conn.Read(actual_msg)
			if err != nil {
				t.Errorf("Reader: %v", err)
			}
			i++
			runtime.Gosched()
		}
		ch <- true
	}
	go send()
	go receive(close)
	<-close
}

func newConfig(t *testing.T, path string) *websocket.Config {
	config, _ := websocket.NewConfig(fmt.Sprintf("ws://%s%s", serverAddr, path), "http://localhost")
	return config
}

func TestConcurrency(t *testing.T) {
	once.Do(startServer)
	for i := 0; i < 20; i++ {
		go newClient(t)
	}
	wg.Wait()
}
