/**
 *一个已经排序好的很大的数组，现在给它划分成m段，
 *每段长度不定，段长最长为k，然后段内打乱顺序，
 *请设计一个算法对其进行重新排序
 */
package main

import (
	"fmt"
	"math/rand"
	"runtime"
	"sort"
	"time"
)

var r *rand.Rand = rand.New(rand.NewSource(time.Now().UnixNano()))
var testCount int = 10000

func randArray() sort.IntSlice {
	n := r.Intn(testCount)
	a := make([]int, n)
	for i := 0; i < n; i++ {
		a[i] = r.Intn(testCount)
	}
	return sort.IntSlice(a[0:])
}

func merge(r, r1 []int, s, m, t int) {
	i, j, k := s, m+1, s
	for i <= m && j <= t {
		if r[i] <= r[j] {
			r1[k] = r[i]
			k++
			i++
		} else {
			r1[k] = r[j]
			k++
			j++
		}
	}
	if i <= m {
		for i <= m {
			r1[k] = r[i]
			k++
			i++
		}
	} else {
		for j <= t {
			r1[k] = r[j]
			k++
			j++
		}
	}
	for n := s; n < t; n++ {
		r[n] = r1[n]
	}
}

func mergeSort4(r, r1 []int, s, t int, c chan int) {
	if s < t {
		m := (s + t) / 2
		c1, c2 := make(chan int), make(chan int)
		go mergeSort4(r, r1, s, m, c1)
		go mergeSort4(r, r1, m+1, t, c2)
		<-c1
		<-c2
		merge(r, r1, s, m, t)
	}
	c <- 1
}
func mergeSort5(r, r1 []int, s, t int) {
	if s < t {
		m := (s + t) / 2
		mergeSort5(r, r1, s, m)
		mergeSort5(r, r1, m+1, t)
		merge(r, r1, s, m, t)
	}
}
func test3() {
	start := time.Now().UnixNano()
	r1 := r.Perm(testCount)
	r2 := make([]int, len(r1))
	c := make(chan int)
	go mergeSort4(r1, r2, 0, len(r1)-1, c)
	<-c
	end := time.Now().UnixNano()
	fmt.Println(end - start)

	start = time.Now().UnixNano()
	r1 = r.Perm(testCount)
	r2 = make([]int, len(r1))
	mergeSort5(r1, r2, 0, len(r1)-1)
	end = time.Now().UnixNano()
	fmt.Println(end - start)
}
func test4() {
	r1 := r.Perm(testCount)
	r2 := make([]int, len(r1))
	//判断r1长度是否被2整除
	n := len(r1) % 4
	count := len(r1) / 4
	fmt.Println(n, count)
	fmt.Println(r1)
	for i := 0; i < count; i++ {
		merge(r1, r2, i*4, i*4+2, i*4+4)
	}
	if n > 1 {
		merge(r1, r2, count*4, count*4+2, len(r1)-1)
	}
	fmt.Println(r2)
}
func mergeSort(a, b sort.IntSlice, result []int, c chan int) {
	n1, n2 := len(a), len(b)
	astart, bstart, k := 0, 0, 0
	for astart < n1 && bstart < n2 {
		if a[astart] < b[bstart] {
			result[k] = a[astart]
			astart++
			k++
		} else {
			result[k] = b[bstart]
			bstart++
			k++
		}
	}
	if astart < n1 {
		for astart < n1 {
			result[k] = a[astart]
			astart++
			k++
		}
	} else if bstart < n2 {
		for bstart < n2 {
			result[k] = b[bstart]
			bstart++
			k++
		}
	}
	c <- 1
}
func mergeSort2(a, b sort.IntSlice, c chan int) {
	n1, n2 := len(a), len(b)
	astart, bstart := 0, 0
	for astart < n1 && bstart < n2 {
		if a[astart] < b[bstart] {
			c <- a[astart]
			astart++
		} else {
			c <- b[bstart]
			bstart++
		}
	}
	if astart < n1 {
		for astart < n1 {
			c <- a[astart]
			astart++
		}
	} else if bstart < n2 {
		for bstart < n2 {
			c <- b[bstart]
			bstart++
		}
	}
}
func insert(result sort.IntSlice, a, k int) int {
	if k == 0 {
		result[k] = a
	} else {
		i := 0
		for i < k {
			if a < result[i] {
				break
			}
			i++
		}
		if i == k {
			result[k] = a
		} else {
			tmp := result[i]
			for j := i; j < k; j++ {
				result[j+1], tmp = tmp, result[j+1]
			}
			result[i] = a
		}
	}
	k++
	return k
}
func mergeSort3(c1, c2, c3 chan int, result sort.IntSlice) {
	k := 0
	n := len(result)
	for k < n {
		select {
		case a := <-c1:
			k = insert(result, a, k)
		case b := <-c2:
			k = insert(result, b, k)
		case <-time.After(time.Duration(3) * time.Second):
			break
		}
	}
	c3 <- 1
}

func test1() {
	start := time.Now().UnixNano()
	a := randArray()
	sort.Sort(a)
	b := randArray()
	sort.Sort(b)
	c := randArray()
	sort.Sort(c)
	d := randArray()
	sort.Sort(d)

	// fmt.Println(a)
	// fmt.Println(b)
	// fmt.Println(c)
	// fmt.Println(d)

	aLen, bLen, cLen, dLen := len(a), len(b), len(c), len(d)
	//启动两个线程，a和b，c和d先进行排序
	a1 := make([]int, aLen+bLen)
	a2 := make([]int, cLen+dLen)
	c1, c2, c3 := make(chan int), make(chan int), make(chan int)
	go mergeSort(a, b, a1, c1)
	go mergeSort(c, d, a2, c2)
	<-c1
	<-c2
	// fmt.Println(a1)
	// fmt.Println(a2)
	result := make([]int, aLen+bLen+cLen+dLen)
	go mergeSort(a1, a2, result, c3)
	<-c3
	end := time.Now().UnixNano()
	fmt.Println(end - start /*, result*/)
}
func test2() {
	start := time.Now().UnixNano()
	a := randArray()
	sort.Sort(a)
	b := randArray()
	sort.Sort(b)
	c := randArray()
	sort.Sort(c)
	d := randArray()
	sort.Sort(d)

	// fmt.Println(a)
	// fmt.Println(b)
	// fmt.Println(c)
	// fmt.Println(d)

	aLen, bLen, cLen, dLen := len(a), len(b), len(c), len(d)
	c1, c2, c3 := make(chan int, 10), make(chan int, 10), make(chan int)
	array := make([]int, aLen+bLen+cLen+dLen)
	result := sort.IntSlice(array[:])
	go mergeSort2(a, b, c1)
	go mergeSort2(c, d, c2)
	go mergeSort3(c1, c2, c3, result)
	<-c3
	end := time.Now().UnixNano()
	fmt.Println(end - start /*, result*/)
}

func merge2(a []int, low, mid, high int) {
	i, j, k := low, mid+1, 0
	temp := make([]int, high-low+1)
	for i <= mid && j <= high {
		if a[i] < a[j] {
			temp[k] = a[i]
			k++
			i++
		} else {
			temp[k] = a[j]
			k++
			j++
		}
	}
	for i <= mid {
		temp[k] = a[i]
		k++
		i++
	}
	for j <= high {
		temp[k] = a[j]
		k++
		j++
	}
	for n := 0; n < k; n++ {
		a[n+low] = temp[n]
	}
}

//自底向上算法
func mergeSort6(a []int, n int) {
	legth := 1
	for ; legth < n; legth *= 2 {
		i := 0
		for ; i+2*legth-1 <= n-1; i += 2 * legth {
			merge2(a, i, i+legth-1, i+2*legth-1)
		}
		if i+legth <= n-1 {
			merge2(a, i, i+legth-1, n-1)
		}
	}
}
func merge3(a []int, low, mid, high int, c chan int) {
	i, j, k := low, mid+1, 0
	temp := make([]int, high-low+1)
	for i <= mid && j <= high {
		if a[i] < a[j] {
			temp[k] = a[i]
			k++
			i++
		} else {
			temp[k] = a[j]
			k++
			j++
		}
	}
	for i <= mid {
		temp[k] = a[i]
		k++
		i++
	}
	for j <= high {
		temp[k] = a[j]
		k++
		j++
	}
	for n := 0; n < k; n++ {
		a[n+low] = temp[n]
	}
	c <- 1
}
func mergeSort7(a []int, n int) {
	legth := 1
	for ; legth < n; legth *= 2 {
		cs := make(chan int, n/legth+2)
		count := 0
		i := 0
		for ; i+2*legth-1 <= n-1; i += 2 * legth {
			go merge3(a, i, i+legth-1, i+2*legth-1, cs)
			count++
		}
		if i+legth <= n-1 {
			go merge3(a, i, i+legth-1, n-1, cs)
			count++
		}
		for k := 0; k < count; k++ {
			<-cs
		}
	}
}
func test5() {

	n := testCount
	start := time.Now().UnixNano()
	r1 := r.Perm(n)
	mergeSort6(r1, n)
	end := time.Now().UnixNano()
	fmt.Println(end - start)

	start = time.Now().UnixNano()
	r1 = r.Perm(n)
	mergeSort7(r1, n)
	end = time.Now().UnixNano()
	fmt.Println(end - start)
}
func main() {
	runtime.GOMAXPROCS(20)
	test3()
	test5()
}
