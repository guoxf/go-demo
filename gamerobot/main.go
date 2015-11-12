package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"time"
)

//创角协议：username=elvin2&sex=3&t=1&sid=p30qc1aqj2zeepv013ed0f0d&figure=22000004
//升级武具：userid=124710&id=2140799&sid=p30qc1aqj2zeepv013ed0f0d&t=3004&cgl=-20
//休息：id=2140799&sid=p30qc1aqj2zeepv013ed0f0d&t=3008&userid=124710
//上阵：id=586354&sid=ejmezahtqdiscjbjvpjkp3qn&t=3005&userid=46110
//宿命锻造：sid=ejmezahtqdiscjbjvpjkp3qn&t=3009&userid=46110
//签到：sid=p30qc1aqj2zeepv013ed0f0d&t=190102&userid=124275
//祈祷：id=11001&sid=p30qc1aqj2zeepv013ed0f0d&t=1304&userid=124275
//每日消费活动：userid=124275&id1=1000570&sid=p30qc1aqj2zeepv013ed0f0d&t=190302&id2=10300307
//领取宝箱：sid=p30qc1aqj2zeepv013ed0f0d&t=5007&userid=124275
//打关卡：isxz=0&type=2&sid=p30qc1aqj2zeepv013ed0f0d&t=5005&userid=124275
//isxz=0&type=3&sid=p30qc1aqj2zeepv013ed0f0d&t=5005&userid=124275
//isxz=0&type=1&sid=p30qc1aqj2zeepv013ed0f0d&t=5005&userid=124275
//修改sid和sessionid的值要改成登录时的
func main() {
	sessionCookie := http.Cookie{}
	sessionCookie.Name = "ASP.NET_SessionId"
	sessionCookie.Value = "p30qc1aqj2zeepv013ed0f0d"
	sessionCookie.Expires = time.Now().Add(100 * time.Second)
	client := &http.Client{}
	body := ioutil.NopCloser(strings.NewReader("isxz=0&type=3&sid=p30qc1aqj2zeepv013ed0f0d&t=5005&userid=124275"))
	req, _ := http.NewRequest("POST", "http://game.360mxwk.90tank.com/service/main.ashx", body) //http://game.3602mxwk.90tank.com/service/main.ashx

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

	m := make(map[string]Ab)
	m["1"] = Ab{Name: "11"}
	fmt.Println(json.Marshal(&m))
}

type Ab struct {
	Name string
}
