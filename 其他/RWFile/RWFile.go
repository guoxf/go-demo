package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strings"
)

func main() {
	sourceFile := "source.txt"

	fin, err1 := os.Open(sourceFile)
	defer fin.Close()

	if err1 != nil {
		fmt.Println(sourceFile, err1)
		return
	}
	ipFile := "d:/Users/Administrator/Desktop/ip.txt"
	fout, err2 := os.Create(ipFile)
	if err2 != nil {
		fmt.Println(ipFile, err2)
		return
	}
	buf := bufio.NewReader(fin)
	for {
		line, err := buf.ReadString('\n')
		if err != nil || io.EOF == err {
			break
		}
		str := strings.Split(line, "@")
		fmt.Println(str[0])
		fmt.Println(str[1])
		fout.WriteString(str[0] + "\r\n")

	}
}
