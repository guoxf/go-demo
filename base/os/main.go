package main

import (
	"fmt"
	// "os"
	"path"
)

func main() {
	// os.Chdir("d:/")
	// source := "11.txt"
	// fin, err := os.Open(source)
	// if err != nil {
	// 	fmt.Println(err.Error())
	// }
	// fin.Close()

	fmt.Println(path.Join("../os/admin", "../public/views"))
}
