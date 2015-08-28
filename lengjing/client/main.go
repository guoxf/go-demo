package main

import (
	"GoDemo/lengjing/common"
	"bytes"
	"fmt"
	"github.com/pquerna/ffjson/ffjson"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
)

func main() {
	notifyLJ()
}

type XYPayRequestData struct {
	OrderId  string `json:"orderid";form:"orderid"`
	Uid      string `json:"uid";form:"uid"`
	Amount   string `json:"amount";form:"amount"`
	ServerId string `json:"serverid";form:"serverid"`
	Extra    string `json:"extra";form:"extra"`
	Ts       string `json:"ts";form:"ts"`
	Sign     string `json:"sign";form:"sign"`
	Sig      string `json:"sig";form:"sig"`
}

func notifyLJ() {
	u, _ := url.Parse("http://" + common.ServerHost + common.PayUrl)
	q := u.Query()
	q.Set("orderId", "oiqw22")
	q.Set("price", "3000")
	callBack := common.Base64Encode([]byte(`{"sid":"9","productId":"com.jmsg.30000glod","uid":"10001","platform":"test"}`))
	q.Set("callbackInfo", callBack)
	q.Set("sign", common.MD5([]byte(fmt.Sprintf("oiqw223000%sSECRET", callBack))))
	q.Set("channelLabel", "label")
	u.RawQuery = q.Encode()
	fmt.Println(u.String())
	res, err := http.Get(u.String())
	if err != nil {
		fmt.Println(err.Error())
	}
	result, err := ioutil.ReadAll(res.Body)
	res.Body.Close()
	if err != nil {
		log.Fatal(err)
		return
	}
	fmt.Println(string(result))
}

func notifyFromXY() {
	var msg XYPayRequestData
	msg.Amount = "30.00"
	msg.Extra = "com.jmsg.30000glod"
	msg.OrderId = "100005158_11170141_1439687071_3160"
	msg.ServerId = "2"
	msg.Ts = "1439687082"
	msg.Uid = "11170141"
	msg.Sign = "0a19ab1e12aea388f2fbfb224bc596e2"
	msg.Sig = "c41074c392f18c539269d670626ac124"
	b, err := ffjson.Marshal(&msg)
	if err != nil {
		fmt.Println("json err:", err)
	}

	body := bytes.NewBuffer([]byte(b))
	fmt.Println(body)
	res, err := http.Post("http://"+common.ServerHost+"/XY/ChargeNotify", "application/json;charset=utf-8", body)
	if err != nil {
		log.Fatal(err)
		return
	}
	result, err := ioutil.ReadAll(res.Body)
	res.Body.Close()
	if err != nil {
		log.Fatal(err)
		return
	}
	fmt.Println(string(result))
}

type XDPayRequestData struct {
	OrderId    string `json:"order_id"`
	UserId     string `json:"user_id"`
	Gold       string `json:"gold"`
	ClientId   string `json:"client_id"`
	App        string `json:"app"`
	AppId      string `json:"app_id"`
	AppOrderId string `json:"app_order_id"`
	Ext        string `json:"ext"`
	Timestamp  string `json:"timestamp"`
	Sign       string `json:"sign"`
}

func notifyFromXD() {
	var msg XDPayRequestData
	msg.App = "1gikdxcckjy80k8"
	msg.AppId = "1"
	msg.AppOrderId = "feb40ebd-9c63-4776-9d7f-f949c481cb3d"
	msg.ClientId = "1gikdxcckjy80k8"
	msg.Ext = "com.jmsg.3000gold"
	msg.Gold = "0.06"
	msg.OrderId = "14966422"
	msg.Timestamp = "1427168138"
	msg.UserId = "10085475"
	msg.Sign = "37f11eead17b2ba57c1b58b5190ae2b9"
	b, err := ffjson.Marshal(&msg)
	if err != nil {
		fmt.Println("json err:", err)
	}

	body := bytes.NewBuffer([]byte(b))
	fmt.Println(body)
	res, err := http.Post("http://"+common.ServerHost+"/XD/ChargeNotify", "application/json;charset=utf-8", body)
	if err != nil {
		log.Fatal(err)
		return
	}
	result, err := ioutil.ReadAll(res.Body)
	res.Body.Close()
	if err != nil {
		log.Fatal(err)
		return
	}
	fmt.Println(string(result))
}

type MHMHPayRequestData struct {
	TradeNo      string `json:"trade_no"`
	Cpid         string `json:"cpid"`
	GameSeqNum   string `json:"game_seq_num"`
	ServerSeqNum string `json:"server_seq_num"`
	Amount       string `json:"amount"`
	UserId       string `json:"user_id"`
	ExtInfo      string `json:"ext_info"`
	Timestamp    string `json:"timestamp"`
	Verstring    string `json:"verstring"`
}

func notifyFromMHMH() {
	var msg MHMHPayRequestData
	msg.TradeNo = "302200002042418044809000sjui8vfm2qk"
	msg.Cpid = "201"
	msg.GameSeqNum = "1"
	msg.ServerSeqNum = "20001"
	msg.Amount = "1"
	msg.UserId = "26"
	msg.ExtInfo = "test"
	msg.Timestamp = "20150424215022"
	msg.Verstring = "97004032ed93709e695ddae546103269"
	b, err := ffjson.Marshal(&msg)
	if err != nil {
		fmt.Println("json err:", err)
	}

	body := bytes.NewBuffer([]byte(b))
	fmt.Println(body)
	res, err := http.Post("http://"+common.ServerHost+"/MHMH/ChargeNotify", "application/json;charset=utf-8", body)
	if err != nil {
		log.Fatal(err)
		return
	}
	result, err := ioutil.ReadAll(res.Body)
	res.Body.Close()
	if err != nil {
		log.Fatal(err)
		return
	}
	fmt.Println(string(result))
}
