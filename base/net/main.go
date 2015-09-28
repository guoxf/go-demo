package main

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
	"time"
)

/*
 'amount' => '0.01',
  'extra' => 'com.jmsg.3000gold',
  'orderid' => '100005158_4856156_1436371251_4021',
  'serverid' => '1',
  'ts' => '1436371260',
  'uid' => '4856156',
  'sign' => '5774c06097d22e7519a449c8d97289a4',
  'sig' => '57a588c6a0002ee94a69a07ac308a8d7',
*/
func main() {
	//data := make(map[string]interface{})
	//data["e"] = 1
	//fmt.Println(len(data))
	testLogin()
}

type LoginRequestData struct {
	Channel   string
	M         string
	PUid      int
	ServerId  int
	IsAdult   int
	TimeStamp int64
	Sign      string
}

const (
	LOGIN_KEY = "sign,sign_return,signature,m,c" //登陆秘钥
)

func objectToString(v interface{}) string {
	switch v.(type) {
	case string:
		return v.(string)
	case int, int32, int64:
		return fmt.Sprintf("%d", v)
	case float32, float64:
		//return strconv.AppendFloat(v.(float64), 'g', -1, 64)
		return fmt.Sprintf("%f", v.(float64))
	case bool:
		return fmt.Sprintf("%t", v)
	default:
		return fmt.Sprintf("%v", v)
	}
}

//生成签名
func getSign(data *LoginRequestData) string {
	plainText := fmt.Sprintf("%s%d%d%d%d", LOGIN_KEY, data.IsAdult, data.PUid, data.ServerId, data.TimeStamp)
	fmt.Println(plainText)
	tmp := md5.Sum([]byte(plainText))
	plainText = hex.EncodeToString(tmp[:])
	return strings.ToUpper(plainText)
}
func generateUrl(params map[string]interface{}) string {
	p := url.Values{}
	for key, v := range params {
		p.Set(key, objectToString(v))
	}

	return fmt.Sprintf("%s", p.Encode())
}
func testLogin() {
	var msg LoginRequestData
	msg.Channel = "channel"
	msg.IsAdult = 0
	msg.M = "login"
	msg.PUid = 12
	msg.ServerId = 1
	msg.TimeStamp = time.Now().UnixNano()
	msg.Sign = getSign(&msg)

	v := make(map[string]interface{})
	v["Channel"] = msg.Channel
	v["M"] = msg.M
	v["IsAdult"] = msg.IsAdult
	v["PUid"] = msg.PUid
	v["ServerId"] = msg.ServerId
	v["TimeStamp"] = msg.TimeStamp
	v["Sign"] = msg.Sign

	body := ioutil.NopCloser(strings.NewReader(generateUrl(v))) //把form数据编下码

	//msg := `{"Channel":"channel","M":"login","PUid":12,"ServerId":1,"IsAdult":0,"TimeStamp":1442987290292733700,"Sign":"EE88F81BE87376CF67121C0CC497F7E8"}`
	//body := ioutil.NopCloser(strings.NewReader(msg)) //把form数据编下码
	client := &http.Client{}
	req, _ := http.NewRequest("POST", "http://127.0.0.1:8080/v1/login/?"+generateUrl(v), body)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value") //这个一定要加，不加form的值post不过去，被坑了两小时
	fmt.Printf("%+v\n", req)                                                         //看下发送的结构
	resp, err := client.Do(req)                                                      //发送
	fmt.Println(err)
	defer resp.Body.Close() //一定要关闭resp.Body
	data, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(string(data), err)
}
func testXDCharge() {
	v := make(map[string]string)
	v["Gold"] = "388"
	v["Ext"] = "com.jmsg.4500stone"
	v["Order_id"] = "100005158_4856156_1436371251_4021"
	v["App_id"] = "2"
	v["Timestamp"] = "1436371260"
	v["User_id"] = "32743973"
	v["sign"] = "5774c06097d22e7519a449c8d97289a4"
	v["sig"] = "57a588c6a0002ee94a69a07ac308a8d7"
	b, _ := json.Marshal(v)
	body := ioutil.NopCloser(strings.NewReader(string(b))) //把form数据编下码
	client := &http.Client{}
	req, _ := http.NewRequest("POST", "http://0.0.0.0:8892/test/chargeNotify", body)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value") //这个一定要加，不加form的值post不过去，被坑了两小时
	fmt.Printf("%+v\n", req)                                                         //看下发送的结构

	resp, err := client.Do(req) //发送
	fmt.Println(err)
	defer resp.Body.Close() //一定要关闭resp.Body
	data, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(string(data), err)
}

func testXYCharge() {
	v := make(map[string]string)
	v["amount"] = "0.01"
	v["extra"] = "com.jmsg.3000gold"
	v["orderid"] = "100005158_4856156_1436371251_4021"
	v["serverid"] = "1"
	v["ts"] = "1436371260"
	v["uid"] = "4856156"
	v["sign"] = "5774c06097d22e7519a449c8d97289a4"
	v["sig"] = "57a588c6a0002ee94a69a07ac308a8d7"
	b, _ := json.Marshal(v)
	body := ioutil.NopCloser(strings.NewReader(string(b))) //把form数据编下码
	client := &http.Client{}
	req, _ := http.NewRequest("POST", "http://0.0.0.0:8892/xy/chargeNotify", body)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value") //这个一定要加，不加form的值post不过去，被坑了两小时
	fmt.Printf("%+v\n", req)                                                         //看下发送的结构

	resp, err := client.Do(req) //发送
	fmt.Println(err)
	defer resp.Body.Close() //一定要关闭resp.Body
	data, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(string(data), err)
}

func testCrash() {
	b := `recv: 140, {"Armid":81,"ArmStarAdvance":1,"SoulStone":0,"ArmSoulStoneOID":81,"ArmSoulStoneCount":9}
send: 140, {"Armid":81}
recv: 140, {"Armid":81,"ArmStarAdvance":2,"SoulStone":0,"ArmSoulStoneOID":81,"ArmSoulStoneCount":0}
send: 140, {"Armid":322}
recv: 140, {"Armid":322,"ArmStarAdvance":1,"SoulStone":0,"ArmSoulStoneOID":322,"ArmSoulStoneCount":0}
send: 140, {"Armid":57}
recv: 140, {"Armid":57,"ArmStarAdvance":1,"SoulStone":0,"ArmSoulStoneOID":57,"ArmSoulStoneCount":33}
send: 140, {"Armid":57}
recv: 140, {"Armid":57,"ArmStarAdvance":2,"SoulStone":0,"ArmSoulStoneOID":57,"ArmSoulStoneCount":30}
send: 140, {"Armid":57}
recv: 140, {"Armid":57,"ArmStarAdvance":3,"SoulStone":0,"ArmSoulStoneOID":57,"ArmSoulStoneCount":26}
send: 4, {"formation":[{"armid":30,"index":0},{"armid":23,"index":1},{"armid":293,"index":2},{"armid":0,"index":3},{"armid":44,"index":4},{"armid":76,"index":5},{"armid":0,"index":6},{"armid":0,"index":7},{"armid":320,"index":8},{"armid":0,"index":9},{"armid":0,"index":10},{"armid":0,"index":11},{"armid":25,"index":12},{"armid":0,"index":13},{"armid":0,"index":14},{"armid":0,"index":15}]}
send: 41, {"star":[0,1,1,0]}
recv: 4, {"ret":true}
send: 140, {"Armid":94}
recv: 140, {"Armid":94,"ArmStarAdvance":1,"SoulStone":0,"ArmSoulStoneOID":94,"ArmSoulStoneCount":38}
send: 140, {"Armid":94}
recv: 140, {"Armid":94,"ArmStarAdvance":2,"SoulStone":0,"ArmSoulStoneOID":94,"ArmSoulStoneCount":35}
send: 140, {"Armid":94}
recv: 140, {"Armid":94,"ArmStarAdvance":3,"SoulStone":0,"ArmSoulStoneOID":94,"ArmSoulStoneCount":31}
send: 4, {"formation":[{"armid":30,"index":0},{"armid":23,"index":1},{"armid":293,"index":2},{"armid":0,"index":3},{"armid":44,"index":4},{"armid":76,"index":5},{"armid":0,"index":6},{"armid":0,"index":7},{"armid":320,"index":8},{"armid":0,"index":9},{"armid":0,"index":10},{"armid":0,"index":11},{"armid":25,"index":12},{"armid":0,"index":13},{"armid":0,"index":14},{"armid":0,"index":15}]}
recv: 4, {"ret":true}
send: 140, {"Armid":96}
recv: 140, {"Armid":96,"ArmStarAdvance":1,"SoulStone":0,"ArmSoulStoneOID":96,"ArmSoulStoneCount":28}
send: 140, {"Armid":96}
`
	body := ioutil.NopCloser(strings.NewReader(string(b))) //把form数据编下码
	client := &http.Client{}
	req, _ := http.NewRequest("POST", "http://42.62.67.240:8888/api/test/SaveCrash", body)
	//req.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value") //这个一定要加，不加form的值post不过去，被坑了两小时
	fmt.Printf("%+v\n", req)    //看下发送的结构
	resp, err := client.Do(req) //发送
	fmt.Println(err)
	defer resp.Body.Close() //一定要关闭resp.Body
	data, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(string(data), err)
}
