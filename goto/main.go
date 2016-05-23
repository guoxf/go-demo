package main

import (
	"fmt"
	"time"
	//"reflect"
)

func main() {

	a := 1
loop:
	for {
		switch {
		case a == 1:
			fmt.Println("a=1")
		case a == 2:
			fmt.Println("a=2")
			fallthrough //继续往下执行
		case a == 3:
			fmt.Println("a=3")
		case a > 3 && a < 10:
			fmt.Println("a=", a)
			a++
			break loop //跳转
		default:
			return
		}
		a++
	}
	ch := make(chan bool)
	go func() {
		time.Sleep(10 * time.Second)
		ch <- true
	}()
	select {
	case <-ch:
		fmt.Println("do something")
	case <-time.After(5 * time.Second):
		fmt.Println("timeout")
	}
	testDefer()
}

func test() {
	var flag = true
	if flag {
		goto SUCCESS
	} else {
		goto ERROR
	}
SUCCESS:
	fmt.Println("SUCCESS")
	return
ERROR:
	fmt.Println("ERROR")
}

func normal() {
	var flag = true
	if flag {
		fmt.Println("SUCCESS")
	} else {
		fmt.Println("ERROR")
	}
}

func testDefer() {
	defer fmt.Println("quit 1")
	defer fmt.Println("quit 2")
	defer func() {
		if err := recover(); err != nil {
			fmt.Println(err)
		}
	}()
	panic("panic")
}
