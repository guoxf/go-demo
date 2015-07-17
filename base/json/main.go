package main

import(
	"encoding/json"
	"fmt"
	"net"
)
type RemainCard struct{
	CardType int //卡牌类型
	Num int      //剩余数量
}
type BackEntity struct {
		Result    bool
		Score     int
		CheckCode int
		DeadHero  []int
		RemainCards []RemainCard//剩余的卡牌
}

type BackEntity2 struct {
		Result    bool
		Score     int
		CheckCode int
		DeadHero  []int
		Fight struct{
		RemainCards []struct{
			CardType int //卡牌类型
			Num int      //剩余数量
		}
		}
}
func s(length int){
	v:=make([]int,1,length)
	fmt.Println(v)
}
var str111 string=`{"CheckCode":8263611,"Result":false,"DeadHero":[],"Fight":{"RemainCards":[{"CardType":1,"Num":4},{"CardType":9,"Num":1}],"curOnHeroes":[],"deadHeroes":[]},"Score":94}`
func main(){
	var back BackEntity2
	fmt.Println(json.Unmarshal([]byte(str111),&back))
	fmt.Println(back)
//	deadHero:=[]int{1,2,3}
//	remainCards:=[]RemainCard{
//			RemainCard{CardType:1,Num:1},
//			RemainCard{CardType:2,Num:1},
//		}
//	back:=BackEntity{
//		Result:true,
//		Score:1000,
//		CheckCode:100000,
//		DeadHero:deadHero,
//		RemainCards:remainCards,
//	}
//	str,_:=json.Marshal(&back.RemainCards)
//	fmt.Println(string(str))
//	var back2 BackEntity2
//	json.Unmarshal(str,&back2.RemainCards)
//	fmt.Println(back2)
//	a:=[]int{1,2,3}
//	str,_=json.Marshal(&a)
//	fmt.Println(str)
//	checkCode:=1
//	str,_=json.Marshal(map[string]interface{}{"LadderRank": 100,"Result":false,"CheckCode":checkCode})
//	result:=make(map[string]interface{})
//	json.Unmarshal(str,&result)
//	fmt.Println(result)
//	value,ok:=result["LadderRank"]
//	if ok{
//		fmt.Println(value.(float64))
//	}
//	x:=result["1"]
//	fmt.Println(x)
//	b:=[]byte(`{"SrcID":1,"DestID":352,"Op":1001,"CastType":0,"Content":"eyJWYWx1ZSI6MTk4LCJUeXBlIjo2LCJFeHRyYSI6MCwiUmVhc29uIjoi5oiY5Yqb5o6S6KGM5qac5aWW5YqxIn0=","Time":1434805200}`)
//	m:=make(map[string]interface{})
//	json.Unmarshal(b,&m)
//	fmt.Println(m)
//	m2:=make(map[string]interface{})
//	fmt.Println([]byte("eyJWYWx1ZSI6MTk4LCJUeXBlIjo2LCJFeHRyYSI6MCwiUmVhc29uIjoi5oiY5Yqb5o6S6KGM5qac5aWW5YqxIn0="))
//	json.Unmarshal([]byte("eyJWYWx1ZSI6MTk4LCJUeXBlIjo2LCJFeHRyYSI6MCwiUmVhc29uIjoi5oiY5Yqb5o6S6KGM5qac5aWW5YqxIn0="),&m2)
//	fmt.Println(m2)
	
	hubconn, err := net.Dial("tcp", "42.62.67.240:8891")
	if err != nil {
		fmt.Println("Failed dial hub", err)
	}
	fmt.Println(hubconn.Close())
	str:=`{"ID":1,"PurchaseAddr":"0.0.0.0:15555","Platform":"test:server","GSName":"Test","DBDatabase":"zone","DBHost":"42.62.67.240:3306","DBPasswd":"feixiongtech_mysql","DBUser":"root","GSRedisAddr":"0.0.0.0:6379","GSRedisDB":0}`
	var gs GSInfo
	json.Unmarshal([]byte(str),&gs)
	fmt.Println(gs)
}
type GSInfo struct {
	ID           int
	PurchaseAddr string
	Platform     string
	GSName       string
	DBDatabase   string
	DBHost       string
	DBPasswd     string
	DBUser       string
	GSRedisAddr  string
	GSRedisDB    int
	Sess *BackEntity
}