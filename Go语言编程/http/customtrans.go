package main

import (
	"fmt"
	"net/http"
	"strings"
)

type OurCustomTransport struct {
	Transport http.RoundTripper
}

func (t *OurCustomTransport) transport() http.RoundTripper {
	if t.Transport != nil {
		return t.Transport
	}
	return http.DefaultTransport
}

func (t *OurCustomTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	return t.transport().RoundTrip(req)
}

func (t *OurCustomTransport) Client() *http.Client {
	return &http.Client{Transport: t}
}

func main() {
	t := &OurCustomTransport{}
	var postdata string = ""
	body := strings.NewReader(postdata)
	c := t.Client()
	req, err := http.NewRequest("GET", "http://www.xuandy.com", body)
	req.Header=
	if err != nil {
		fmt.Println("NewRequest error:", err)
		return
	}
	resp, err := c.Do(req)
	if err != nil {
		fmt.Println("Do error:", err)
		return
	}
	fmt.Println(resp.Body)
}
