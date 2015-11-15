package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"os"
	"strings"
)

func main() {
	_pub_addr := "11"
	v := interface{}(_pub_addr)
	switch v.(type) {
	case string:
		fmt.Println("string")
	}
	if env := os.Getenv("NSQD_HOST"); env != "" {
		_pub_addr = env + "/pub?topic=LOG"
	}
	fmt.Println(_pub_addr)
	result := md5.Sum([]byte("123"))
	fmt.Println(result[:])
	plainText := hex.EncodeToString(result[:])
	fmt.Println(plainText)
	plainText = strings.ToUpper(plainText)
	fmt.Println(plainText)
}
