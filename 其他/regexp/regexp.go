package main

import (
	"fmt"
	"math"
	"math/rand"
	"path"
	"regexp"
	"strconv"
	"strings"
	"time"
)

var r = rand.New(rand.NewSource(time.Now().UnixNano()))

func main() {
	fmt.Println(pathFormate("upfile", "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}"))
	fmt.Println(time.Now().String())
	fmt.Printf("%03d", 1)
	text := `Hello 《世界》！123 Go.`

	// 查找连续的小写字母
	reg := regexp.MustCompile(`[a-z]+`)
	fmt.Printf("%q\n", reg.FindAllString(text, -1))

	// 查找连续的汉字
	reg = regexp.MustCompile(`[\p{Han}]+`)
	fmt.Printf("%q\n", reg.FindAllString(text, 1))

	reg = regexp.MustCompile(`\{rand(\:?)(\d+)\}`)
	match := reg.FindStringSubmatch("{rand:10}")
	var digit int64 = 6
	if len(match) > 2 {
		digit, _ = strconv.ParseInt(match[2], 10, 64)
	}
	fmt.Println(r.Int63n(int64(math.Pow(10, float64(digit)))), reg.FindString("{rand:10}"))
}

func pathFormate(fileName, formate string) string {
	if formate == "" {
		formate = "{filename}{rand:6}"

	}
	reg := regexp.MustCompile(`[\\\/\:\*\?\042\<\>\|]`)
	reg.ReplaceAllString(fileName, "")
	extension := path.Ext(fileName)
	fileName = strings.Replace(fileName, "."+extension, "", 1)
	formate = strings.Replace(formate, "{filename}", fileName, 1)

	reg = regexp.MustCompile(`\{rand(\:?)(\d+)\}`)
	randPart := reg.FindString(formate)
	match := reg.FindStringSubmatch(formate)
	var digit int64 = 6
	if len(match) > 2 {
		digit, _ = strconv.ParseInt(match[2], 10, 64)
	}
	digit = r.Int63n(int64(math.Pow(10, float64(digit))))
	formate = strings.Replace(formate, randPart, fmt.Sprint(digit), 1)

	now := time.Now()
	formate = strings.Replace(formate, "{time}", fmt.Sprint(now.Unix()), 1)
	formate = strings.Replace(formate, "{yyyy}", fmt.Sprint(now.Year()), 1)
	formate = strings.Replace(formate, "{yy}", fmt.Sprintf("%02d", now.Year()%100), 1)
	formate = strings.Replace(formate, "{mm}", fmt.Sprintf("%02d", now.Month()), 1)
	formate = strings.Replace(formate, "{dd}", fmt.Sprintf("%02d", now.Day()), 1)
	formate = strings.Replace(formate, "{hh}", fmt.Sprintf("%02d", now.Hour()), 1)
	formate = strings.Replace(formate, "{ii}", fmt.Sprintf("%02d", now.Minute()), 1)
	formate = strings.Replace(formate, "{ss}", fmt.Sprintf("%02d", now.Second()), 1)
	return formate + extension
	// appReg := regexp.MustCompile(`/serverstatus/(agent|auth|rank|chat)/[0-9]*`)
	// gameReg := regexp.MustCompile(`/serverstatus/game/[0-9]*/[0-9]*`)
	// num := regexp.MustCompile(`[0-9]{1,18}`)
	// fmt.Printf("%q\n", appReg.FindString("/goserver/serverstatus/agent/10000"))
	// fmt.Printf("%q\n", appReg.FindString("/goserver/serverstatus/auth/10001"))
	// fmt.Printf("%v\n", gameReg.MatchString("/goserver/serverstatus/game/100001/100002"))
	//
	// fmt.Printf("%q\n", num.FindAllString("/goserver/serverstatus/game/agent/10000", -1))
	// fmt.Printf("%q\n", num.FindAllString("/goserver/serverstatus/game/100001/100002", -1))
}
