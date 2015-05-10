package main

import (
	"container/list"
	"fmt"
)

func main() {
	fmt.Println("Learning Array slice map!")
	fmt.Println("第一种声明方式")
	var array1 []string
	array1 = make([]string, 2)
	array1[0] = "0"
	array1[1] = "1"
	fmt.Println(array1)

	fmt.Println("第2种声明方式")
	array2 := []string{"1", "0"}
	fmt.Println(array2)

	fmt.Println("append")
	arrray3 := append(array2, "-1")
	fmt.Println(arrray3)

	fmt.Println("slice")
	array4 := arrray3[1:2] //［1，2)开区间
	fmt.Println(array4)

	fmt.Println("第一种声明方式")
	var m1 map[string]int
	m1 = make(map[string]int)
	m1["1"] = 1
	m1["2"] = 2
	fmt.Println(m1)

	fmt.Println("第2种声明方式")
	m2 := map[string]int{"1": 1, "2": 2}
	fmt.Println(m2)
	fmt.Println()

	m3 := map[string][]int{"key1": {1, 2}, "key2": {3, 4}}
	fmt.Println(m3)
	fmt.Println()

	l := list.New()
	l.PushBack(1)
	l.PushBack("2")
	fmt.Println("Before Removing...")
	fmt.Println("list len ", l.Len())
	for e := l.Front(); e != nil; e = l.Front() {
		fmt.Println("Removing", e.Value)
		l.Remove(e)
	}
	fmt.Println()

	l.PushBack("3")
	l.PushBack(4)
	fmt.Println("Before Removing...")
	fmt.Println("list len", l.Len())
	var n *list.Element
	for e := l.Front(); e != nil; e = n {
		fmt.Println("Removing", e.Value)
		n = e.Next()
		l.Remove(e)
	}

	l.PushBack(5)
	l.PushBack("6")
	fmt.Println("Before Removing...")
	fmt.Println("list len ", l.Len())
	for e := l.Front(); e != nil; e = e.Next() {
		fmt.Println("Removing", e.Value)
		l.Remove(e)
	}
	fmt.Println()
	fmt.Println("After Removing...")
	for e := l.Front(); e != nil; e = e.Next() {
		fmt.Println(e.Value)
	}

}
