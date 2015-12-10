package stack

import "strconv"

type Stack struct{
	i int
	array [10]int
}

func (this *Stack)Push(n int){
	if this.i+1>9{
		return
	}
	this.i++
	this.array[this.i]=n
}

func (this *Stack)Pop()int{
	if this.i-1>9 || this.i-1<0{
		return 0
	}
	this.i--
	return this.array[this.i]
}

func (this*Stack)String()string{
	var str string
	for i:=0;i<this.i;i++{
		str=str+"["+strconv.Itoa(i)+":"+strconv.Itoa(this.array[i])+"]"
	}
	return str
}