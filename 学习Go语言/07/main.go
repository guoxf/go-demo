package main

import (
	"bufio"
	"fmt"
	"os"
	"os/exec"
	"sort"
	"strconv"
	"strings"
	"net"
)

func showPS() {
	ps := exec.Command("ps", "-e", "-opid,ppid,comm")
	output, _ := ps.Output()
	child := make(map[int][]int)
	for i, s := range strings.Split(string(output), "\n") {
		if i == 0 {
			continue
		}
		if len(s) == 0 {
			continue
		}
		f := strings.Fields(s)
		fpp, _ := strconv.Atoi(f[1])
		fp, _ := strconv.Atoi(f[0])
		child[fpp] = append(child[fpp], fp)
	}
	schild := make([]int, len(child))
	i := 0
	for k, _ := range child {
		schild[i] = k
		i++

	}
	sort.Ints(schild)
	for _, ppid := range schild {
		fmt.Printf("Pid %d has %d child", ppid, len(child[ppid]))
		if len(child[ppid]) == 1 {
			fmt.Printf(":%v\n", child[ppid])
			continue
		}
		fmt.Printf("ren:%v\n", child[ppid])
	}
}
func staticCharAndWord() {
	var chars, words, lines int
	r := bufio.NewReader(os.Stdin)
	for {
		switch s, ok := r.ReadString('\n'); true {
		case ok != nil:
			fmt.Printf("%d %d %d", chars, words, lines)
			return
		default:
			chars += len(s)
			words += len(strings.Fields(s))
			lines++
		}
	}
}
func uniq() {
	list := []string{"a", "b", "a", "a", "c", "d", "e",
		"f"}
	first := list[0]
	fmt.Printf("%s ", first)
	for _, v := range list[1:] {
		if first != v {
			fmt.Printf("%s ", v)
			first = v
		}
	}
	fmt.Println()
}
func quine() {
	var q = `/* Go quine */
package main
import "fmt"
func main() {
fmt.Printf("%s%c%s%c\n", q, 0x60, q, 0x60)
}
var q = `
	fmt.Printf("%s%c%s%c\n", q, 0x60, q, 0x60)
}
func echo(c net.Conn){
	defer c.Close()
	line,err:=bufio.NewReader(c).ReadString('\n')
	if err!=nil{
		fmt.Printf("Failure to read:%s\n",err.Error())
		return
	}
	_,err=c.Write([]byte(line))
	if err!=nil{
		fmt.Printf("Failure to write:%s\n",err.Error())
		return
	}
}
func main() {
	l,err:=net.Listen("tcp","127.0.0.1:8053")
	if err!=nil{
		fmt.Printf("Failure to listen:%s\n",err.Error())
		return
	}
	for{
		if c,err:=l.Accept();err==nil{
			go echo(c)
		}
	}
}
