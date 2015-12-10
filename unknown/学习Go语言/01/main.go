package main

import(
	"unicode/utf8"
)

func forloop(){
	for i:=0;i<10;i++{
		println(i)
	}
}
func forloop2(){
	i:=0
Here:
	println(i)
	i++
	if i<10{
		goto Here
	}
}
func fizzBuzz(){
	for i:=1;i<101;i++{
		if i%3==0 && i%5==0{
			println("FizzBuzz")
		}else if i%3==0{
			println("Fizz")
		}else if i%5==0{
			println("Buzz")
		}else{
			println(i)
		}
	}
}
func fizzBuzz2(){
	p:=false
	for i:=1;i<101;i++{
		if i%3==0{
			print("Fizz")
			p=true
		}
		if i%5==0{
			print("Buzz")
			p=true
		}
		if !p{
			print(i)
		}
		p=false
		println()
	}
}
func printString(){
	for i:=0;i<100;i++{
		for j:=0;j<=i;j++{
			print("A")
		}
		println()
	}
}
func printString2(){
	str:="A"
	for i:=0;i<100;i++{
		println(str)
		str+="A"
	}
}
func replace(str string){
	newStr:=[]byte(str)
	if len(newStr)>=6{		
		println("Old string is ",str)
		newStr[3]='a'
		newStr[4]='b'
		newStr[5]='c'
		println("New string is ",string(newStr))
	}
}
func replace2(str string){
	newStr:=[]rune(str)
	copy(newStr[4:4+3],[]rune("abc"))
	println("Before ",str)
	println("After ",string(newStr))
}
func staticStringCount(str string){
	println("The string is ",str,",string len is ",utf8.RuneCountInString(str))
	println("string \"",str,"\" length ",len([]byte(str)),",Runs\n",utf8.RuneCount([]byte(str)))
}

func reverse(str string){
	r:=[]rune(str)
	for i,j:=0,len(r)-1;i<j;i,j=i+1,j-1{
		r[i],r[j]=r[j],r[i] //好方便的交换
	}
	println("Before ",str)
	println("After ",string(r))
}

func average(array []float64){
	var sum float64
	sum=0
	for _,a:=range array{
		sum+=a
	}
	println("Sum is ",sum,"Average is ",sum/float64(len(array)))
}
func average2(array []float64){
	sum:=0.0
	switch len(array){
		case 0:
			println("Average is 0")
			default:
			for _,v:=range array{
				sum+=v
			}
			println("Average is ",sum/float64(len(array)))
	}
}
func main(){
	average2([]float64{1,2.33,4.123})
}