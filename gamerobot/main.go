package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"time"
)

func main() {
	sessionCookie := http.Cookie{}
	sessionCookie.Name = "ASP.NET_SessionId"
	sessionCookie.Value = "ejmezahtqdiscjbjvpjkp3qn"
	sessionCookie.Expires = time.Now().Add(100 * time.Second)
	client := &http.Client{}
	body := ioutil.NopCloser(strings.NewReader("id=578132&type=1&sid=ejmezahtqdiscjbjvpjkp3qn&t=3007&userid=46110"))
	req, _ := http.NewRequest("POST", "http://s1.65wanmxwk.90tank.com/service/main.ashx", body) //http://game.3602mxwk.90tank.com/service/main.ashx

	req.AddCookie(&sessionCookie)
	req.Header.Add("Origin", "http://res.mxwk.90tank.com")
	req.Header.Add("X-Requested-With", "ShockwaveFlash/18.0.0.209")
	req.Header.Add("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.124 Safari/537.36")
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer resp.Body.Close() //一定要关闭resp.Body
	data, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(string(data), err)
}
