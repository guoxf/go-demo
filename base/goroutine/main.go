package main

import (
	"fmt"
	"runtime"
	"time"
	//	"sync"
)

func ping(pings chan<- string, msg string) {
	pings <- msg
}
func pong(pings <-chan string, pongs chan<- string) {
	msg := <-pings
	pongs <- msg
}

//var lock =new(sync.Mutex)
func test(c chan *int, n int) {
	time.Sleep(100)
	//	lock.Lock()
	temp := n
	fmt.Println(temp)
	c <- &(temp)
	//	lock.Unlock()
}
func test2() {
	c1 := make(chan string, 1)
	go func() {
		time.Sleep(time.Second * 2)
		c1 <- "result 2"
	}()
	select {
	case res := <-c1:
		fmt.Println(res)
	case <-time.After(time.Second * 1):
		fmt.Println("timeout 1")
	}
	c2 := make(chan string, 1)
	go func() {
		time.Sleep(time.Second * 1)
		c2 <- "result 2"
	}()
	select {
	case res := <-c2:
		fmt.Println(res)
	case <-time.After(time.Second * 3):
		fmt.Println("timeout 2")
	}
}
func test3() {
	messages := make(chan string)
	signals := make(chan bool)
	flag := true
	go func() {
		for flag {
			select {
			case msg := <-messages:
				fmt.Println("received message", msg)
			default:
				fmt.Println("no message recevied")
			}
		}
	}()
	msg := "hi"
	select {
	case messages <- msg:
		fmt.Println("sent message ", msg)
	default:
		fmt.Println("no message sent")
	}
	select {
	case msg := <-messages:
		fmt.Println("received message", msg)
	case sig := <-signals:
		fmt.Println("received signal", sig)
	default:
		fmt.Println("no activity")
	}
}
func main() {
	runtime.GOMAXPROCS(4)
	//	fmt.Println("Learning goroutine")
	//	num := 5
	//	cs := make(chan *int, num)
	//	for i := 0; i < num; i++ {
	//		go test(cs, i)
	//	}
	//	for i := 0; i < num; i++ {
	//		fmt.Println(*<-cs)
	//	}

	//	pings := make(chan string, 1)
	//	pongs := make(chan string, 1)
	//	ping(pings, "passed message")
	//	pong(pings, pongs)
	//	fmt.Println(<-pongs)
	//	test3()
//	queue := make(chan string, 2)
//	queue <- "one"
//	queue <- "two"
//	fmt.Println(<-queue)
//	queue <- "three"
//	close(queue)
//	for elem := range queue {
//		fmt.Println(elem)
//	}
	challengedRank := 1989
	gainStone := 0
	rise:=7
	switch {
	case challengedRank < 20:
		gainStone = rise * 50
	case challengedRank < 100:
		gainStone = rise * 10
	case challengedRank < 500:
		gainStone = rise * 3
	case challengedRank < 1000:
		gainStone = rise * 1
	case challengedRank < 2000: //宝石数量都是整数，所以获得1.2个算两个
		f := float32(rise) * 0.2
		if rise%5 > 0 {
			gainStone = int(f) + 1
		} else {
			gainStone = int(f)
		}
	}
	fmt.Println(gainStone)
}
