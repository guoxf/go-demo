package main

import (
	"fmt"
	"log"
	"os"
	"strings"

	toolkit "github.com/guoxf/toolkit/io"
	"golang.org/x/crypto/ssh"
)

//var lsFileCMD = `ls -F %s |grep [^\/]$`
var signer ssh.Signer

func init() {
	pemBytes := toolkit.ReadAll("id_rsa")
	var err error
	signer, err = ssh.ParsePrivateKey([]byte(pemBytes))
	if err != nil {
		panic(err)
	}
}

func main() {
	testDial()
}
func testDial() {
	config := &ssh.ClientConfig{
		// User: "root",
		Auth: []ssh.AuthMethod{
			ssh.PublicKeys(signer),
		},
	}
	c, err := ssh.Dial("tcp", "192.168.56.101:22", config)
	if err != nil {
		log.Fatalln(err.Error())
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
		log.Fatalln(err.Error())
		return
	}
	fienNames := strings.Split(string(b), "\n")
	fmt.Println("Output:\n", fienNames)
}
func testKeepAlive() {
	ce := func(err error, msg string) {
		if err != nil {
			log.Fatalf("%s error: %v", msg, err)
		}
	}

	client, err := ssh.Dial("tcp", "192.168.56.101:22", &ssh.ClientConfig{
		User: "root",
		Auth: []ssh.AuthMethod{
			ssh.PublicKeys(signer),
		},
	})
	ce(err, "dial")

	session, err := client.NewSession()
	ce(err, "new session")
	defer session.Close()

	session.Stdout = os.Stdout
	session.Stderr = os.Stderr
	session.Stdin = os.Stdin

	modes := ssh.TerminalModes{
		ssh.ECHO:          0,
		ssh.TTY_OP_ISPEED: 14400,
		ssh.TTY_OP_OSPEED: 14400,
	}
	err = session.RequestPty("xterm", 25, 80, modes)
	ce(err, "request pty")

	err = session.Shell()
	ce(err, "start shell")

	err = session.Wait()
	ce(err, "return")
}
