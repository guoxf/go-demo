package main

import (
	"bytes"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"os/user"
	"runtime"
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
func makeSigner(keyname string) (signer ssh.Signer, err error) {
	fp, err := os.Open(keyname)
	if err != nil {
		return
	}
	defer fp.Close()

	buf, err := ioutil.ReadAll(fp)
	if err != nil {
		return nil, err
	}

	if signer, err = ssh.ParsePrivateKey(buf); err != nil {
		return nil, err
	}
	return
}
func makeKeyring() []ssh.AuthMethod {
	homeDir, err := Home()
	if err != nil {
		log.Println(err)
		return nil
	}
	signers := []ssh.Signer{}
	keys := []string{homeDir + "/.ssh/id_rsa", homeDir + "/.ssh/id_dsa"}

	for _, keyname := range keys {
		signer, err := makeSigner(keyname)
		if err == nil {
			signers = append(signers, signer)
		} else {
			log.Println(err)
		}
	}

	return []ssh.AuthMethod{ssh.PublicKeys(signers...)}
}

func main() {
	testDial()
}
func testDial() {
	config := &ssh.ClientConfig{
		User: "root",
		Auth: makeKeyring(),
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

// Home returns the home directory for the executing user.
//
// This uses an OS-specific method for discovering the home directory.
// An error is returned if a home directory cannot be detected.
func Home() (string, error) {
	user, err := user.Current()
	if nil == err {
		return user.HomeDir, nil
	}

	// cross compile support

	if "windows" == runtime.GOOS {
		return homeWindows()
	}

	// Unix-like system, so just assume Unix
	return homeUnix()
}

func homeUnix() (string, error) {
	// First prefer the HOME environmental variable
	if home := os.Getenv("HOME"); home != "" {
		return home, nil
	}

	// If that fails, try the shell
	var stdout bytes.Buffer
	cmd := exec.Command("sh", "-c", "eval echo ~$USER")
	cmd.Stdout = &stdout
	if err := cmd.Run(); err != nil {
		return "", err
	}

	result := strings.TrimSpace(stdout.String())
	if result == "" {
		return "", errors.New("blank output when reading home directory")
	}

	return result, nil
}

func homeWindows() (string, error) {
	drive := os.Getenv("HOMEDRIVE")
	path := os.Getenv("HOMEPATH")
	home := drive + path
	if drive == "" || path == "" {
		home = os.Getenv("USERPROFILE")
	}
	if home == "" {
		return "", errors.New("HOMEDRIVE, HOMEPATH, and USERPROFILE are blank")
	}

	return home, nil
}
