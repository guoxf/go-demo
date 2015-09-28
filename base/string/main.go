package main

import (
	"errors"
	"time"
)
import (
	"encoding/json"
	"fmt"
	"os"
)

type point struct {
	x, y int
}

func test0() {
	panic("11111")
}
func test2() (back error) {
	defer func() {
		if err := recover(); err != nil {
			back = errors.New(err.(string))
		}
	}()
	test0()
	return nil
}
func main() {
	fmt.Println(fmt.Sprint(1.2))
	p := point{1, 2}
	fmt.Printf("%v\n", p)
	fmt.Printf("%+v\n", p)
	fmt.Printf("%#v\n", p)
	fmt.Printf("%T\n", p)
	fmt.Printf("%t\n", true)
	fmt.Printf("%d\n", 123)
	fmt.Printf("%b\n", 123) //二进制
	fmt.Printf("%c\n", 33)  //码
	fmt.Printf("%x\n", 16)  //HEX编码
	fmt.Printf("%-1f\n", 23.112)
	fmt.Printf("%E\n", 1200000.0)
	fmt.Printf("%e\n", 1200000.0)
	fmt.Printf("%s\n", "\"string\"")
	fmt.Printf("%q\n", "string")
	fmt.Printf("%x\n", "hex this")
	fmt.Printf("%p\n", &p)
	fmt.Println(test2())
	fmt.Printf("|%6d|%6d|\n", 12, 34111)
	fmt.Printf("|%6.2f|%6.2f|\n", 1.2, 1.45)
	fmt.Printf("|%-6.2f|%-6.2f|\n", 1.2, 1.45)
	fmt.Printf("%03d", 1)
	fmt.Fprintf(os.Stdout, "an %s\n", "error")
	fmt.Printf("%f", 142312312344342342.0)
	type DataIn struct {
		Lists []struct {
			HeroOid int `json:"Heroid"`
			Ins     [3]int
		}
	}
	var msg DataIn
	json.Unmarshal([]byte(`{"Lists":[{"Ins":[1435066087,0,0,11],"Heroid":9},{"Ins":[1435065661,0,0,11],"Heroid":12}]}`), &msg)
	fmt.Println(msg)
	for i, v := range msg.Lists {
		fmt.Println(i, v)
	}
loop1:
	{
		fmt.Println("loop1")
		return
	}

loop2:
	{
		fmt.Println("loop2")
		return
	}
	if true {
		goto loop1
	} else {
		goto loop2
	}
	thisDate := "2015-07-17"
	fDate := "2006-01-02"
	date, err := time.Parse(fDate, thisDate)
	fmt.Println(date, err, date.Unix())
	fmt.Println(time.Unix(1439856000, 0))
	loc, _ := time.LoadLocation("Local")
	date, err = time.ParseInLocation("2006-01-02", "2015-08-06", loc)
	fmt.Println(date.Unix())
	fmt.Println(time.Date(date.Year(), date.Month(), date.Day(), date.Hour(), 0, 0, 0, time.Local))

}
