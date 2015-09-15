package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

const (
	numPollers     = 3
	pollInterval   = 10 * time.Second
	statusInterval = 10 * time.Second
	errTimeout     = 10 * time.Second
)

var urls = []string{
	"https://www.baidu.com/",
	"http://studygolang.com/",
	"https://github.com/",
}

type State struct {
	url    string
	status string
	poller int
}

func StateMonitor(updateInterval time.Duration) chan<- State {
	updates := make(chan State)
	urlStatus := make(map[string]string)
	ticker := time.NewTicker(updateInterval)
	go func() {
		for {
			select {
			case <-ticker.C:
				logState(urlStatus)
			case s := <-updates:
				urlStatus[s.url] = fmt.Sprintf("%s %d", s.status, s.poller)
			}
		}
	}()
	return updates
}

func logState(s map[string]string) {
	log.Println("Current state")
	for k, v := range s {
		log.Printf(" %s %s", k, v)
	}
}

type Resource struct {
	url      string
	index    int
	errCount int
}

func (r *Resource) Poll() string {
	resp, err := http.Head(r.url)
	if err != nil {
		log.Println("Error", r.url, err)
		r.errCount++
		return err.Error()
	}
	r.errCount = 0
	return resp.Status
}

func (r *Resource) Sleep(done chan<- *Resource) {
	time.Sleep(pollInterval + errTimeout*time.Duration(r.errCount))
	done <- r
}

func Poller(in <-chan *Resource, out chan<- *Resource, status chan<- State, index int) {
	for r := range in {
		s := r.Poll()
		status <- State{r.url, s, index}
		out <- r
	}
}

func main() {
	pending, complete := make(chan *Resource), make(chan *Resource)

	status := StateMonitor(statusInterval)

	for i := 0; i < numPollers; i++ {
		go Poller(pending, complete, status, i)
	}

	go func() {
		for k, url := range urls {
			pending <- &Resource{url: url, index: k}
		}
	}()

	for r := range complete {
		go r.Sleep(pending)
	}
}
