package main

import "fmt"

const(
	count=10
)
var stack=make([]int,count)
var index=0
func push(n int){
	if index<count && index >=0{
		stack[index]=n
		index++
	}else{
		panic("超出索引")
	}	
}

func pop()int{
	if index<count && index>0{	
		index--	
		n:=stack[index]
		stack[index]=0		
		return n
	}
	panic("超出索引")
}
func String(start,end int){
	fmt.Printf("My stack %v\n",stack[start:end])
}

func fibonacci(n int){
	array:=make([]int,n)
	for i:=0;i<n;i++{
		if i==0 || i==1{
			array[i]=1
		}else{
			array[i]=array[i-1]+array[i-2]
		}
	}
	fmt.Println(array)
}
func square(i int)int{
	return i*i
}
func map1(fn func(int)int,array[]int)[]int{
	result:=make([]int,len(array))
	for index,v:=range array{
		result[index]=fn(v)
	}
	return result
}
func max(array []int){
	fmt.Println(array)
	if len(array)==0{
		return
	}
	temp:=array[0]
	for _,v:=range array{
		if temp<v{
			temp=v
		}
	}
	fmt.Println("Max is ",temp)
}
func min(array []int){
	fmt.Println(array)
	if len(array)==0{
		return
	}
	temp:=array[0]
	for _,v:=range array{
		if temp>v{
			temp=v
		}
	}
	fmt.Println("Min is ",temp)
}

func map3(fn func(int,int)int,array[]int)int{
	fmt.Println(array)
	if len(array)==0{
		return 0
	}
	temp:=array[0]
	for _,v:=range array{
		temp=fn(temp,v)
	}
	return temp
}

func bubbleSort(array []int){
	fmt.Println("Before ",array)
	for i:=0;i<len(array);i++{
		for j:=i+1;j<len(array);j++{
			if array[i]>array[j]{
				array[i],array[j]=array[j],array[i]
			}
		}
	}
	fmt.Println("After ",array)
}
func plusTwo()(func(int)int){
	fn:=func(i int)int{
		return i+2
	}
	return fn
}
func plusX(x int)(func(int)int){
	fn:=func(i int)int{
		return i+x
	}
	return fn
}
func main(){
	defer func(){
		if x:=recover();x!=nil{
			fmt.Println(x)
		}
	}()
	push(5)
	push(4)
	String(0,2)
	fmt.Println(pop())
	fmt.Println(pop())
	String(0,count)
	fibonacci(10)
	fmt.Println(map1(square,[]int{1,2,3,4,5}))
	min([]int{2,31,41,42,2})
	max([]int{2,31,41,42,2})
	n:=map3(func(temp,v int)int{
		if temp>v{
			return temp
		}else{
			return v
		}
	},[]int{2,31,41,42,2})
	fmt.Println("Max is ",n)
	n=map3(func(temp,v int)int{
		if temp<v{
			return temp
		}else{
			return v
		}
	},[]int{2,31,41,42,2})
	fmt.Println("Min is ",n)
	bubbleSort([]int{2,31,41,42,2})
	p := plusTwo()
fmt.Printf("%v\n", p(2))
p = plusX(3)
fmt.Printf("%v\n", p(2))
}