package common

import (
	"crypto/md5"
	"encoding/base64"
	"encoding/hex"
)

const (
	ProductSecret = "SECRET"
	ServerHost    = "0.0.0.0:8080"
	PayUrl        = "/Lengjing/ChargeNotify"
)

func Base64Encode(src []byte) string {
	return base64.StdEncoding.EncodeToString(src)
}

func Base64Decode(src string) ([]byte, error) {
	return base64.StdEncoding.DecodeString(src)
}

func MD5(src []byte) string {
	h := md5.New()
	h.Write(src)
	return hex.EncodeToString(h.Sum(nil))
}

//callbackInfo格式：{"sid":1,"productId":"","uid":"","platform":"test"}
//price:是分单位
type PayRequestData struct {
	OrderId      string `json:"orderId"`
	Price        string `json:"price"`
	ChannelCode  string `json:"channelCode"`
	CallBackInfo string `json:"callbackInfo"`
	Sign         string `json:"sign"`
	ChannelLabel string `json:"channelLabel"`
}

type LoginRequestData struct {
	UserId      int    `json:"userId"`
	Channel     string `json:"channel"`
	Token       int    `json:"token"`
	ProductCode int    `json:"productCode"`
}
