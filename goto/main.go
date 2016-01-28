package main

import (
	"fmt"
)

func main() {
    test()
    normal()
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
