package main

import (
	"fmt"
	"strings"

	"golang.org/x/crypto/ssh"
)

//var lsFileCMD = `ls -F %s |grep [^\/]$`

func main() {
	config := &ssh.ClientConfig{
		User: "root",
		Auth: []ssh.AuthMethod{
			ssh.Password("123456"),
		},
	}
	c, err := ssh.Dial("tcp", "192.168.56.101:22", config)
	if err != nil {
		return
	}
	defer c.Close()

	session, err := c.NewSession()
	if err != nil {
		return
	}
	defer session.Close()

	b, err := session.Output("ls /data/goserver")
	if err != nil {
		return
	}
	fienNames := strings.Split(string(b), "\n")
	fmt.Println("Output:\n", fienNames)
}
