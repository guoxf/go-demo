package main

import (
	"fmt"
	"time"
)

var n = 1

func test(c chan *int) {
	time.Sleep(100)
	temp := n + 1
	fmt.Println(temp)
	c <- &(temp)
	n++
}

func main() {
	fmt.Println("Learning goroutine")
	num := 5
	cs := make(chan *int, num)
	for i := 0; i < num; i++ {
		go test(cs)
	}
	for i := 0; i < num; i++ {
		fmt.Println(*<-cs)
	}
}
