package main

import (
	"fmt"
	"os"

	"bufio"
	"encoding/json"
	"flag"
	"io"
	"strings"

	file "github.com/guoxf/toolkit/io"
)

type ComposedConfig struct {
	SrcPath string   `json:"srcPath"`
	DstPath string   `json:"dstPath"`
	Sep     string   `json:"sep"`
	Sep2    string   `json:"sep2"`
	Sep3    string   `json:"sep3"`
	Ids     []string `json:"ids"`
	Prefix  string   `json:"prefix"`
	Suffix  string   `json:"suffix"`
}

func main() {
	var configPath string
	flag.StringVar(&configPath, "config", "./composed.json", "配置文件路径，默认路径：./composed.json")
	flag.Parse()
	fmt.Println("配置文件路径:", configPath)
	var composeConfig ComposedConfig
	err := json.Unmarshal([]byte(file.ReadAll(configPath)), &composeConfig)
	if err != nil {
		fmt.Println(err)
		return
	}
	srcFile, err := os.Open(composeConfig.SrcPath)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer srcFile.Close()

	dstFile, err := file.CreateFileOfTrunc(composeConfig.DstPath)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer dstFile.Close()

	reader := bufio.NewReader(srcFile)
	n := 0
	for {
		line, err := reader.ReadString('\n')
		if err != nil && io.EOF != err {
			fmt.Println(err)
			break
		}
		if line != "" {
			line, err = composeStr(n, line, composeConfig)
			if err != nil {
				fmt.Println(err)
				return
			}
			_, err = dstFile.Write([]byte(line))
			if err != nil {
				fmt.Printf("写入第%d行时出错，%v\n", n, err)
				return
			}
		}
		n++
		if io.EOF == err {
			break
		}
	}
	pressAnyKey()
}

func composeStr(n int, line string, config ComposedConfig) (string, error) {
	line = strings.Replace(line, "\n", "", -1)
	line = strings.Replace(line, "\r", "", -1)
	array := strings.Split(line, config.Sep3)
	if len(array) != len(config.Ids) {
		err := fmt.Errorf("第%d行数据有问题%v,ids的长度=%d,\n", n, array, len(config.Ids))
		return "", err
	}
	for i := range array {
		array[i] = fmt.Sprintf("%s%s%s", config.Ids[i], config.Sep, array[i])
	}
	line = strings.Join(array, config.Sep2)
	line = fmt.Sprintf("%s%s%s\n", config.Prefix, line, config.Suffix)
	return line, nil
}

func pressAnyKey() {
	fmt.Println("按任意键关闭！")
	var s string
	fmt.Scanf("%s", &s)
	fmt.Println(s)
}
