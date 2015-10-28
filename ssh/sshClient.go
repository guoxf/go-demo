package main

import (
	"fmt"
	"strings"

	"golang.org/x/crypto/ssh"
)

//ls -c 根据修改时间排序 -F?
//awk -F split,
//head -n，n为显示多少个
const (
	//只显示文件
	lsFileCMD = `ls -F %s |grep [^\/]$ | awk -F '/' '{print $1}' `
	//只显示目录
	lsDirCMD = "ls -F %s | grep /$ | awk -F '/' '{print $1}' "
	// lsTopFileCMD = `ls -cF |grep [^\/]$ | awk -F '/' '{print $1}' | head -%d`
	// lsTopDirCMD  = `ls -cF |grep /$ | awk -F '/' '{print $1}' | head -%d`
)

type SSHClient struct {
	User     string
	Password string
	HostIP   string //包含端口
	Auth     []ssh.AuthMethod
	client   *ssh.Client
}

func newSSHClient(user, password, hostIP string, auth []ssh.AuthMethod) (client *SSHClient, err error) {
	client = &SSHClient{
		User:     user,
		Password: password,
		HostIP:   hostIP,
		Auth:     auth,
	}
	config := &ssh.ClientConfig{
		User: user,
		Auth: auth,
	}
	client.client, err = ssh.Dial("tcp", client.HostIP, config)
	return client, err
}

func (client *SSHClient) Close() {
	client.client.Close()
}

// 创建一个新的ssh连接，然后执行命令
// 返回rootPath目录下的所有文件的名称
func (client *SSHClient) GetFileNames(rootPath string) ([]string, error) {
	return client.GetNames(rootPath, false, false, 0)
}

// 创建一个新的ssh连接，然后执行命令
// 返回根据修改时间排序后rootPath目录下前n个文件的名称
func (client *SSHClient) GetTopFileNames(rootPath string, n int) ([]string, error) {
	return client.GetNames(rootPath, false, true, n)
}

// 创建一个新的ssh连接，然后执行命令
// 返回rootPath目录下的所有文件夹的名称
func (client *SSHClient) GetDirNames(rootPath string) ([]string, error) {
	return client.GetNames(rootPath, true, false, 0)
}

// 创建一个新的ssh连接，然后执行命令
// 返回根据修改时间排序后rootPath目录下前n个文件夹的名称
func (client *SSHClient) GetTopDirNames(rootPath string, n int) ([]string, error) {
	return client.GetNames(rootPath, true, true, n)
}

// 会新建一个session
// 获取文件名或者文件夹名称
// dir=true时，返回文件夹的名称，否则返回文件的名称
// top=true时，返回根据修改时间排序后rootPath目录下前n个文件夹的名称，
// 否则返回全部，且不根据修改时间排序
func (client *SSHClient) GetNames(rootPath string, dir, top bool, n int) ([]string, error) {
	session, err := client.client.NewSession()
	if err != nil {
		return nil, err
	}
	defer session.Close()

	return GetNamesWithSSH(session, rootPath, dir, top, n)
}

// 创建一个新的ssh连接
func (client *SSHClient) NewSession() (*ssh.Session, error) {
	return client.client.NewSession()
}

// 创建一个新的ssh连接后执行命令，
// 不返回执行结果
func (client *SSHClient) Run(cmdStr string) error {
	session, err := client.client.NewSession()
	if err != nil {
		return err
	}
	defer session.Close()

	return session.Run(cmdStr)
}

// 创建一个新的ssh连接后执行命令
// 返回执行结果
func (client *SSHClient) Output(cmdStr string) ([]byte, error) {
	session, err := client.client.NewSession()
	if err != nil {
		return nil, err
	}
	defer session.Close()

	return session.Output(cmdStr)
}

// 创建一个新的ssh连接后执行命令
// filePath为绝对路径
// 返回文件内容
func (client *SSHClient) ReadFile(filePath string) (string, error) {
	session, err := client.client.NewSession()
	if err != nil {
		return "", err
	}
	defer session.Close()

	return ReadFileWithSSH(session, filePath)
}

func ReadFileWithSSH(session *ssh.Session, filePath string) (string, error) {
	cmdStr := fmt.Sprintf(`cat -A %s`, filePath)
	b, err := session.Output(cmdStr)
	if err != nil {
		return "", err
	}
	return string(b), nil
}

// 返回rootPath目录下的所有文件的名称
func GetFileNamesWithSSH(session *ssh.Session, rootPath string) ([]string, error) {
	return GetNamesWithSSH(session, rootPath, false, false, 0)
}

// 返回根据修改时间排序后rootPath目录下前n个文件的名称
func GetTopFileNamesWithSSH(session *ssh.Session, rootPath string, n int) ([]string, error) {
	return GetNamesWithSSH(session, rootPath, false, true, n)
}

//返回rootPath文件夹下最后修改的一个文件名称
func GetOneFileNameWithSSH(session *ssh.Session, rootPath string) (string, error) {
	names, err := GetNamesWithSSH(session, rootPath, false, true, 1)
	if err != nil {
		return "", err
	}
	if len(names) == 0 {
		return "", fmt.Errorf("该%s文件夹下没有任何文件", rootPath)
	}
	return names[0], nil
}

// 返回rootPath目录下的所有文件夹的名称
func GetDirNamesWithSSH(session *ssh.Session, rootPath string) ([]string, error) {
	return GetNamesWithSSH(session, rootPath, true, false, 0)
}

//返回rootPath文件夹下最后修改的一个文件夹名称
func GetOneDirNameWithSSH(session *ssh.Session, rootPath string) (string, error) {
	names, err := GetNamesWithSSH(session, rootPath, true, true, 1)
	if err != nil {
		return "", err
	}
	if len(names) == 0 {
		return "", fmt.Errorf("该%s文件夹下没有任何文件夹", rootPath)
	}
	return names[0], nil
}

// 返回根据修改时间排序后rootPath目录下前n个文件夹的名称
func GetTopDirNamesWithSSH(session *ssh.Session, rootPath string, n int) ([]string, error) {
	return GetNamesWithSSH(session, rootPath, true, true, n)
}

// 获取文件名或者文件夹名称
// dir=true时，返回文件夹的名称，否则返回文件的名称
// top=true时，返回根据修改时间排序后rootPath目录下前n个文件夹的名称，
// 否则返回全部，且不根据修改时间排序
func GetNamesWithSSH(session *ssh.Session, rootPath string, dir, top bool, n int) ([]string, error) {
	var cmdStr string
	if dir {
		cmdStr = fmt.Sprintf(lsDirCMD, rootPath)
	} else {
		cmdStr = fmt.Sprintf(lsFileCMD, rootPath)
	}
	if top {
		cmdStr += fmt.Sprintf(`| head -%d`, n)
	}
	b, err := session.Output(cmdStr)
	if err != nil {
		return nil, err
	}
	fileNames := strings.Split(string(b), "\n")
	return fileNames, nil
}
