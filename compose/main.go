package main

import (
	"fmt"
	"os"

	"bufio"
	"encoding/json"
	"io"
	"strings"

	file "github.com/guoxf/toolkit/io"
	"github.com/tealeg/xlsx"
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
	// 开启id过滤
	EnableFilterId bool `json:"enableFilterId"`
	// id=这个值就过滤掉
	FilterId   string `json:"filterId"`
	StartRow   int    `json:"startRow"`
	StartCol   int    `json:"startCol"`
	EndCol     int    `json:"endCol"`
	ReplaceCol int    `json:"replaceCol"`
	EndStr     string `json:"endStr"`
}

var config ComposedConfig

func loadConfig() {
	fmt.Println(`
选择要从哪里读取数据
	输入1从excel中读取数据并写回excel
	输入2从文本文件中读取
	`)
	var srcType string
	for {
		fmt.Scanf("%s", &srcType)
		if srcType == "1" || srcType == "2" {
			break
		}
	}

	fmt.Println(`
选择生成格式： 
	输入1，生成1=3;2=7;3=7;4=2;5=1;a=200;b=30000
	输入2，生成[3,7,7,2,1,200,30000]
	输入3，生成{"key1":3,"key2":7,"key3":7,"key4":2,"key5":1,"a":200,"b":30000}
	`)
	var genFormat string
	for {
		fmt.Scanf("%s", &genFormat)
		if genFormat == "1" || genFormat == "2" || genFormat == "3" {
			break
		}
	}
	var configPath string
	switch genFormat {
	case "1":
		configPath = "./conf/default"
	case "2":
		configPath = "./conf/array"
	case "3":
		configPath = "./conf/json"
	default:
		configPath = "./conf/default"
	}

	switch srcType {
	case "1":
		configPath += "-excel.json"
	case "2":
		configPath += ".json"
	default:
		configPath += "-excel.json"
	}

	fmt.Println("配置文件路径:", configPath)
	err := json.Unmarshal([]byte(file.ReadAll(configPath)), &config)
	if err != nil {
		fmt.Println(err)
		pressAnyKey()
		panic(err)
	}
	switch srcType {
	case "1":
		fromExcel()
	case "2":
		fromText()
	default:
		fromExcel()
	}
}

func main() {
	loadConfig()
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
	line = fmt.Sprintf("%s%s%s\r\n", config.Prefix, line, config.Suffix)
	return line, nil
}

func pressAnyKey() {
	fmt.Println("按任意键关闭！")
	var s string
	fmt.Scanf("%s", &s)
	fmt.Println(s)
}

func fromText() {
	srcFile, err := os.Open(config.SrcPath)
	if err != nil {
		fmt.Println(err)
		pressAnyKey()
		return
	}
	defer srcFile.Close()

	dstFile, err := file.CreateFileOfTrunc(config.DstPath)
	if err != nil {
		fmt.Println(err)
		pressAnyKey()
		return
	}
	defer dstFile.Close()

	reader := bufio.NewReader(srcFile)
	n := 0
	for {
		line, err := reader.ReadString('\n')
		if err != nil && io.EOF != err {
			fmt.Println(err)
			pressAnyKey()
			break
		}
		if line != "" {
			line, err = composeStr(n, line, config)
			if err != nil {
				fmt.Println(err)
				return
			}
			_, err = dstFile.Write([]byte(line))
			if err != nil {
				fmt.Printf("写入第%d行时出错，%v\n", n, err)
				pressAnyKey()
				return
			}
		}
		n++
		if io.EOF == err {
			break
		}
	}
}

//
func fromExcel() {
	startRow, startCol, endCol, replaceCol := config.StartRow, config.StartCol, config.EndCol, config.ReplaceCol
	xlFile, err := xlsx.OpenFile(config.SrcPath)
	if err != nil {
		fmt.Println(err)
		return
	}
	for _, sheet := range xlFile.Sheets {
		for i, row := range sheet.Rows {
			if i < startRow {
				continue
			}
			count := len(row.Cells)
			if count < startCol || count < endCol || count < replaceCol {
				fmt.Println("第%d行的数据只有%d列,合并的开始列=%d，结束列=%d，要替换的列=%d", i, startCol, endCol, replaceCol)
				return
			}
			array := make([]string, endCol-startCol+1)
			for i := startCol - 1; i < endCol; i++ {
				n := i - startCol + 1
				array[n] = fmt.Sprintf("%s%s%s", config.Ids[n], config.Sep, row.Cells[i].String())
			}
			result := strings.Join(array, config.Sep2)
			result = fmt.Sprintf("%s%s%s\r\n", config.Prefix, result, config.Suffix)
			fmt.Println(result)
			row.Cells[config.ReplaceCol-1].SetString(result)
			if row.Cells[0].String() == config.EndStr {
				break
			}
		}
	}
	err = xlFile.Save(config.DstPath)
	if err != nil {
		fmt.Println(err)
	}
}
