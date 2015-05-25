package main

import(
	"fmt"
	"strings"
	"strconv"
)

func containers(){
	fmt.Println(strings.Contains("seafood","foo"))
	fmt.Println(strings.Contains("seafood","bar"))
	fmt.Println(strings.Contains("",""))
}

func join(){
	s:=[]string{"foo","bar","baz"}
	fmt.Println(strings.Join(s,","))
}

func index(){
	fmt.Println(strings.Index("chicken","ken"))
	fmt.Println(strings.Index("chicken","dmr"))
}
func repeat(){
	fmt.Println("ba"+strings.Repeat("na",2))
}
func replace(){
	fmt.Println(strings.Replace("oilnk oink oink","k","ky",2))
	fmt.Println(strings.Replace("oink oink oink","oink","moo",-1))
}
func split(){
	fmt.Printf("%q\n",strings.Split("a,b,c",","))
	fmt.Printf("%q\n",strings.Split("a man a plan a canal panama","a "))
	fmt.Printf("%q\n",strings.Split(" xyz ",""))
	fmt.Println("%q\n",strings.Split("","Bernardo 0'Higgins"))
}
func trim(){
	fmt.Printf("[%q]",strings.Trim("!!! Achung !!!","!"))
}
func fields(){
	fmt.Printf("Fields are :%q",strings.Fields(" foo bar baz "))
}

func Append(){
	str:=make([]byte,0,100)
	str=strconv.AppendInt(str,4567,10)
	str=strconv.AppendBool(str,false)
	str=strconv.AppendQuote(str,"abcdefg")
	str=strconv.AppendQuoteRune(str,'单')
	fmt.Println(string(str))
}
func format(){
	a:=strconv.FormatBool(false)
	b:=strconv.FormatFloat(123.23,'g',5,64)
	c:=strconv.FormatInt(1234,16)
	d:=strconv.FormatUint(12345,2)
	fmt.Println(a,b,c,d)
}
func checkError(e error){
	if e!=nil{
		fmt.Println(e)
	}
}
func parse(){
	a,err:=strconv.ParseBool("false")
	checkError(err)
	b,err:=strconv.ParseFloat("123.23",64)
	checkError(err)
	c,err:=strconv.ParseInt("123",10,64)
	checkError(err)
	d,err:=strconv.ParseUint("12345",10,64)
	checkError(err)
	e,err:=strconv.Atoi("1023")
	checkError(err)
	fmt.Println(a,b,c,d,e)
}
func main(){
	parse()
}