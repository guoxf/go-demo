package main

import (
	"fmt"
	"math/rand"
)

const (
	Seed = "ABDCEFGHIJKLMNOPQRSTUVWXYZ0123456789"
)

func main() {
	var op uint8
	for i := 0; i < 10; i++ {
		op = uint8(i)
		op ^= 0x1
		fmt.Println(i, op)
	}

	for i := -10; i < 0; i++ {
		op = uint8(i)
		op ^= 0x1
		fmt.Println(i, op)
	}
	op = 251
	fmt.Println(op, op>>2, op>>2&1)
	op = 1
	fmt.Println(op<<2, ^(op << 2))
	op = ^(op << 2)
	fmt.Println((^op) >> 2)
	a, b := 227, 338
	fmt.Printf("%d=%b\n%d=%b\n", a, a, b, b)
	a = a ^ b
	fmt.Printf("%d=%b\n%d=%b\n", a, a, b, b)
	b = a ^ b
	fmt.Printf("%d=%b\n%d=%b\n", a, a, b, b)
	a = a ^ b
	fmt.Printf("%d=%b\n%d=%b\n", a, a, b, b)
	a, b = b, a
	fmt.Println(a, b)
	//判断int型变量a是奇数还是偶数 a&1 = 0 偶数 a&1 = 1 奇数
	fmt.Println(3&1, 89&1, 104&1)
	//取int型变量a的第k位 (k=0,1,2……sizeof(int))，即a>>k&1
	fmt.Println(7 >> 2 & 1)
	//将int型变量a的第k位置设置为1， 即a=a|(1<<k)
	//int型变量循环左移k次，即a=a<<k|a>>16-k (设sizeof(int)=16)
	//int型变量a循环右移k次，即a=a>>k|a<<16-k (设sizeof(int)=16)
	n := 10000000
	var l int = 8
	var result map[string]int = make(map[string]int)
	tmp := make([]byte, l)
	for i := 0; i < n; i++ {
		for j := 0; j < l; j++ {
			tmp[j] = Seed[rand.Intn(36)]
		}
		result[string(tmp)] = 0
	}
	fmt.Println(len(result))
}
