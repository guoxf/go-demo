package main

import (
	"bufio"
	"io"
	"log"
	"os"
	//	"strings"
	"encoding/binary"
)

func main() {
	fi, err := os.Open("./qqwry.dat")
	if err != nil {
		panic(err)
	}
	defer fi.Close()
	count := 0
	buf := bufio.NewReader(fi)
	arrary := []int{1, 2, 3, 4, 5, 6, 7, 8}
	log.Println(arrary[4:])
	//	result, err := buf.Peek(4)
	//	log.Println(string(result), binary.LittleEndian.Uint16(result))
	//	result, err = buf.Peek(4)
	//	log.Println(string(result), binary.LittleEndian.Uint16(result))
	//	result, err = buf.Peek(4)
	//	log.Println(string(result), binary.LittleEndian.Uint16(result))
	//	return
	for {
		line, _, err := buf.ReadLine()
		if err != nil {
			if err == io.EOF {
				return
			}

			log.Println("ReadLine", err)
			return
		}
		log.Println(binary.LittleEndian.Uint16(line))
		log.Println(binary.LittleEndian.Uint16(line[4:]))
		str := string(line)
		if str == "" {
			continue
		}
		log.Println(str)
		//		log.Println(strings.Split()).
		count++
		if count > 10 {
			return
		}
	}
}
