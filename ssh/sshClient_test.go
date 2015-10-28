package main

import (
	"log"
	"testing"

	. "github.com/smartystreets/goconvey/convey"
	"golang.org/x/crypto/ssh"
)

var (
	sshClient *SSHClient
	host      = "192.168.56.101:22"
	user      = "root"
	password  = "123456"
)

func init() {
	var err error
	sshClient, err = newSSHClient(user, password, host, []ssh.AuthMethod{
		ssh.Password(password),
	})
	if err != nil {
		panic(err)
	}
}

func TestGetDirNames(t *testing.T) {
	Convey("Test GetDirNames", t, func() {
		names, err := sshClient.GetDirNames("/data/goserver")
		So(err, ShouldBeNil)
		log.Println(names)
	})
}

func TestGetTopDirNames(t *testing.T) {
	Convey("Test GetTopDirNames", t, func() {
		names, err := sshClient.GetTopDirNames("/data/goserver", 5)
		So(err, ShouldBeNil)
		log.Println(names)
	})
}

func TestGetFileNames(t *testing.T) {
	Convey("Test GetFileNames", t, func() {
		names, err := sshClient.GetFileNames("/data/goserver/front/20151028")
		So(err, ShouldBeNil)
		log.Println(names)
	})
}

func TestGetTopFileNames(t *testing.T) {
	Convey("Test GetTopFileNames", t, func() {
		names, err := sshClient.GetTopFileNames("/data/goserver/front/20151028", 1)
		So(err, ShouldBeNil)
		log.Println(names)
	})
}

func TestReadFile(t *testing.T) {
	Convey("Test ReadFile", t, func() {
		names, err := sshClient.ReadFile("/data/goserver/1.txt")
		So(err, ShouldBeNil)
		log.Println(names)
	})
}
