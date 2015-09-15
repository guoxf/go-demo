package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/bitly/go-nsq"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"strconv"
	"time"
)

func main() {
	consumerTest()
}

type MyTestHandler struct {
	q                *nsq.Consumer
	messagesSent     int
	messagesReceived int
	messagesFailed   int
}

var nullLogger = log.New(ioutil.Discard, "", log.LstdFlags)

func (h *MyTestHandler) LogFailedMessage(message *nsq.Message) {
	h.messagesFailed++
	h.q.Stop()
}

func (h *MyTestHandler) HandleMessage(message *nsq.Message) error {
	fmt.Println(string(message.Body))
	if string(message.Body) == "TOBEFAILED" {
		h.messagesReceived++
		return errors.New("fail this message")
	}

	data := struct {
		Msg string
	}{}

	err := json.Unmarshal(message.Body, &data)
	if err != nil {
		return err
	}

	msg := data.Msg
	if msg != "single" && msg != "double" {
		fmt.Println("message 'action' was not correct: ", msg, data)
	}
	h.messagesReceived++
	return nil
}

func SendMessage(port int, topic string, method string, body []byte) {
	httpclient := &http.Client{}
	endpoint := fmt.Sprintf("http://127.0.0.1:%d/%s?topic=%s", port, method, topic)
	req, err := http.NewRequest("POST", endpoint, bytes.NewBuffer(body))
	resp, err := httpclient.Do(req)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	resp.Body.Close()
}

func consumerTest() {
	config := nsq.NewConfig()
	laddr := "127.0.0.1"
	// so that the test can simulate binding consumer to specified address
	config.LocalAddr, _ = net.ResolveTCPAddr("tcp", laddr+":0")
	// so that the test can simulate reaching max requeues and a call to LogFailedMessage
	config.DefaultRequeueDelay = 0
	// so that the test wont timeout from backing off
	config.MaxBackoffDuration = time.Millisecond * 50
	topicName := "rdr_test"
	topicName = topicName + strconv.Itoa(int(time.Now().Unix()))
	q, _ := nsq.NewConsumer(topicName, "ch", config)

	h := &MyTestHandler{
		q: q,
	}
	q.AddHandler(h)

	SendMessage(4151, topicName, "put", []byte(`{"msg":"single"}`))
	SendMessage(4151, topicName, "mput", []byte("{\"msg\":\"double\"}\n{\"msg\":\"double\"}"))
	SendMessage(4151, topicName, "put", []byte("TOBEFAILED"))
	h.messagesSent = 4

	addr := "127.0.0.1:4150"
	err := q.ConnectToNSQD(addr)
	if err != nil {
		fmt.Println(err)
	}

	err = q.ConnectToNSQD(addr)
	if err == nil {
		fmt.Println("should not be able to connect to the same NSQ twice")
	}
	<-q.StopChan
}
