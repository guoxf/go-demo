package main

import (
	"encoding/json"
	"net/http"
	"io/ioutil"
	"fmt"
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
func main(){
	v:=make(map[string]string)
	v["amount"]="0.01"
	v["extra"]="com.jmsg.3000gold"
	v["orderid"]="100005158_4856156_1436371251_4021"
	v["serverid"]="1"
	v["ts"]="1436371260"
	v["uid"]="4856156"
	v["sign"]="5774c06097d22e7519a449c8d97289a4"
	v["sig"]="57a588c6a0002ee94a69a07ac308a8d7"
	b,_:=json.Marshal(v)
	body := ioutil.NopCloser(strings.NewReader(string(b))) //把form数据编下码
	client := &http.Client{}
	req,_:=http.NewRequest("POST","http://0.0.0.0:8892/xy/chargeNotify",body)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value") //这个一定要加，不加form的值post不过去，被坑了两小时
	fmt.Printf("%+v\n", req)                                                         //看下发送的结构
	
	resp, err := client.Do(req) //发送
	fmt.Println(err)
	defer resp.Body.Close()     //一定要关闭resp.Body
	data, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(string(data), err)
}