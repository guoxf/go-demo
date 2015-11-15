package main

import "fmt"

func Add(x, y int) {
	z := x + y
	fmt.Println("x+y=", z)
}
func Count(ch chan int, x, y int) {
	fmt.Println("Counting")
	Add(x, y)
	ch <- 1
}
func main() {
	chs := make([]chan int, 10)
	for i := 0; i < 10; i++ {
		chs[i] = make(chan int)
		go Count(chs[i], i, i)
	}
	for _, ch := range chs {
		<-ch
	}
}
