package main

import (
	"fmt"
	"time"
	"runtime"
//	"sync"
)


//var lock =new(sync.Mutex)
func test(c chan *int,n int ) {
	time.Sleep(100)
//	lock.Lock()
	temp := n
	fmt.Println(temp)
	c <- &(temp)
//	lock.Unlock()
}

func main() {
	runtime.GOMAXPROCS(4)
	fmt.Println("Learning goroutine")
	num := 5
	cs := make(chan *int, num)
	for i := 0; i < num; i++ {
		go test(cs,i)
	}
	for i := 0; i < num; i++ {
		fmt.Println(*<-cs)
	}
}
