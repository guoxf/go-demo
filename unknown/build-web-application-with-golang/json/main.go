package main

import (
	"encoding/json"
	"fmt"
)

type Server struct {
	ServerName string
	ServerIP   string
}
type Serverslice struct {
	Servers []Server
}

func unmarshal() {
	var s Serverslice
	str := `{"servers":[{"serverName":"Shanghai_VPN","serverIP":"127.0.0.1"},{"serverName":"Beijing_VPN","serverIP":"127.0.0.2"}]}`
	json.Unmarshal([]byte(str), &s)
	fmt.Println(s)
}
func unmarshalUnknown() {
	b := []byte(`{"Name":"Wednesday","Age":6,"Parents":["Gomez","Morticia"]}`)
	var f interface{}
	err := json.Unmarshal(b, &f)
	if err != nil {
		fmt.Printf("error:%v", err)
		return
	}
	m, ok := f.(map[string]interface{})
	if !ok {
		return
	}
	for k, v := range m {
		switch vv := v.(type) {
		case string:
			fmt.Println(k, " is string ", vv)
		case int:
			fmt.Println(k, " is int ", vv)
		case float64:
			fmt.Println(k, " is float64 ", vv)
		case []interface{}:
			fmt.Println(k, " is an array: ", vv)
			for i, u := range vv {
				fmt.Println(i, u)
			}
		default:
			fmt.Println(k, "is of a type i don't know to handler")
		}
	}
}
func main() {
	unmarshalUnknown()
}
