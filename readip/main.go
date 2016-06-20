package main

import (
	"fmt"

	"github.com/wangtuanjie/ip17mon"
)

func init() {
	if err := ip17mon.Init("./17monipdb.dat"); err != nil {
		panic(err)
	}
}

func main() {
	loc, err := ip17mon.Find("101.81.55.25")
	if err != nil {
		fmt.Println("err:", err)
		return
	}
	fmt.Println(loc)
}
