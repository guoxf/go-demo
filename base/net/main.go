package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
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
	testXDCharge()
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
