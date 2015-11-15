package main

import (
	"GoDemo/lengjing/common"
	"fmt"
	"github.com/pquerna/ffjson/ffjson"
	"net/http"
	"strconv"
)

func getPayRequestData(r *http.Request) *common.PayRequestData {
	r.ParseForm()
	var msg common.PayRequestData
	msg.OrderId = r.FormValue("orderId")
	msg.Price = r.FormValue("price")
	msg.CallBackInfo = r.FormValue("callbackInfo")
	msg.ChannelCode = r.FormValue("channelCode")
	msg.Sign = r.FormValue("sign")
	return &msg
}
func payBackFromLJ(w http.ResponseWriter, r *http.Request) {
	msg := getPayRequestData(r)
	msg.ChannelLabel = r.FormValue("channelLabel")
	if !verifySign(msg) {
		fmt.Println("签名错误 ")
		w.Write([]byte("fail"))
		return
	}
	callBack, err := common.Base64Decode(msg.CallBackInfo)
	if err != nil {
		fmt.Println("callbackInfo 解码错误", err.Error())
		w.Write([]byte("fail"))
		return
	}

	var backInfo callBackInfo
	err = ffjson.Unmarshal([]byte(callBack), &backInfo)
	if err != nil {
		fmt.Println(err.Error())
		w.Write([]byte("fail"))
		return
	}
	sendData := newSendToServerData(msg, &backInfo)
	if sendData == nil {
		w.Write([]byte("fail"))
		return
	}
	w.Write([]byte(sendToServer(&backInfo, sendData)))
}
func newSendToServerData(requestData *common.PayRequestData, callBackData *callBackInfo) *sendToServerData {
	var msg sendToServerData
	msg.ProductID = callBackData.ProductId
	msg.Uid = callBackData.Uid
	msg.UniqueID = requestData.OrderId
	price, err := strconv.ParseInt(requestData.Price, 10, 32)
	if err != nil {
		fmt.Println(requestData.Price, err.Error())
		return nil
	}
	msg.Price = fmt.Sprintf("%d", price/100)
	return &msg
}
func sendToServer(callBackData *callBackInfo, msg *sendToServerData) string {
	fmt.Println(callBackData, msg)
	return "success"
}

type callBackInfo struct {
	Sid       int    `json:"sid"`
	ProductId string `json:"productId"`
	Uid       string `jsong:"uid"`
	Platform  string `json:"platform"`
}

type sendToServerData struct {
	Uid       string
	UniqueID  string
	ProductID string
	Price     string
}

func verifySign(msg *common.PayRequestData) bool {
	plainText := fmt.Sprintf("%s%s%s%s", msg.OrderId, msg.Price, msg.CallBackInfo, common.ProductSecret)
	sign := common.MD5([]byte(plainText))
	return sign == msg.Sign
}

func main() {
	http.HandleFunc(common.PayUrl, payBackFromLJ)
	err := http.ListenAndServe(common.ServerHost, nil)
	if err != nil {
		fmt.Println(err.Error())
	}
}
