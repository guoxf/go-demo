package main

import (
	"fmt"
	"regexp"
)

func main() {
	text := `Hello 《世界》！123 Go.`

	// 查找连续的小写字母
	reg := regexp.MustCompile(`[a-z]+`)
	fmt.Printf("%q\n", reg.FindAllString(text, -1))

	// 查找连续的汉字
	reg = regexp.MustCompile(`[\p{Han}]+`)
	fmt.Printf("%q\n", reg.FindAllString(text, 1))

	appReg := regexp.MustCompile(`/serverstatus/(agent|auth|rank|chat)/[0-9]*`)
	gameReg := regexp.MustCompile(`/serverstatus/game/[0-9]*/[0-9]*`)
	num := regexp.MustCompile(`[0-9]{1,18}`)
	fmt.Printf("%q\n", appReg.FindString("/goserver/serverstatus/agent/10000"))
	fmt.Printf("%q\n", appReg.FindString("/goserver/serverstatus/auth/10001"))
	fmt.Printf("%v\n", gameReg.MatchString("/goserver/serverstatus/game/100001/100002"))

	fmt.Printf("%q\n", num.FindAllString("/goserver/serverstatus/game/agent/10000", -1))
	fmt.Printf("%q\n", num.FindAllString("/goserver/serverstatus/game/100001/100002", -1))
}
