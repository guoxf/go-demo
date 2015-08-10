package main

import (
	"container/list"
	"encoding/json"
	"fmt"
	"time"
)

type Player struct {
	Name string
	Uid  int
}

func TestStructToString() []byte {
	player := Player{"Player1", 123}
	result, _ := json.Marshal(&player)
	return result
}
func testJsonToStruct(msg []byte) {
	player := Player{}
	json.Unmarshal(msg, &player)
	fmt.Println(player)
}
func testMapToString() []byte {
	player := make(map[string]interface{})
	player["Name"] = "Player1"
	player["Uid"] = 123
	result, _ := json.Marshal(&player)

	return result
}
func testJsonToMap(msg []byte) {
	player := make(map[string]interface{})
	json.Unmarshal(msg, &player)
	fmt.Println(player)
}
func testArray() {
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

	var array = [10]byte{'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'}
	aSlice := array[3:7:8] // aSlice包含元素: d,e,f,g，len=4，cap=7
	bSlice := aSlice[0:5]  // 对slice的slice可以在cap范围内扩展，此时bSlice包含：d,e,f,g,h
	fmt.Println(array)
	fmt.Println(aSlice)
	fmt.Println(bSlice)
}
func getUnSignup(sign_count int) []int {
	s := make([]int, 0, 31)
	day := time.Now().Day()
	for i := 1; i <= day; i++ {
		if getBit(uint(i-1), &sign_count) == 0 {
			s = append(s, i)
		}
	}
	return s
}
func getBit(bit uint, src *int) int {
	return ((*src) >> bit) & 1
}
func main() {
	//	msg1:=TestStructToString()
	//	fmt.Println(string(msg1))
	//	msg2:=testMapToString()
	//	fmt.Println(string(msg2))
	//	testJsonToStruct(msg1)
	//	testJsonToMap(msg2)
	//	f:=0.8
	//	fmt.Println(int(f))
	//	fmt.Println(7%5)
	// fmt.Println("\xe9\x9b\xaa\xe5\xb4\xa9\xe8\xa2\x81\xe9\x80\xa2")
	// a := []int{1, 2, 3}
	// b := make([]int, 3)
	// copy(b, a[0:2])
	// fmt.Println(b)
	// r := []rune("\xe5\xba\x97\xe5\x91\x98\xe5\xbc\xa0\xe8\xbe\xbe q")
	// fmt.Println(len(r))
	// fmt.Println(len("11111111111111111111111111111111111111111111111111111111111111111"))
	// fmt.Println(len("不知道你在说什么阿啊阿啊阿啊阿啊阿啊AA阿啊阿啊阿啊阿啊阿啊啊阿啊阿啊"))
	// fmt.Println(time.Date(2015, 7, 31, 1, 0, 0, 0, time.Local).Unix())

	fmt.Println(getUnSignup(2147483647))
}
