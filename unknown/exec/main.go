package main

import (
	"bytes"
	"fmt"
	"log"
	"os"
	"os/exec"
	"strings"
)

func main() {
	cmd := exec.Command("d:/robot/record.bat")
	cmd.Stdin = strings.NewReader("")
	var out bytes.Buffer
	cmd.Stdout = &out
	err := cmd.Run()
	if err != nil {
		log.Println(err.Error())
	}
	fmt.Printf("in all caps: %q\n", out.String())
}

func testCmd() {
	cmd := exec.Command("cmd.exe")
	cmd.Stdout = os.Stdout
	input, _ := cmd.StdinPipe()
	cmd.Start()
	fmt.Fprintln(input, "set GOOS=linux")
	fmt.Fprintln(input, "set GOOS")
	fmt.Fprintln(input, "dir")
	//fmt.Fprintln(input, "exit")
	cmd.Wait()
}
