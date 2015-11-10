package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"regexp"
	"runtime"
	"strings"
	"time"

	"github.com/coreos/go-etcd/etcd"
)

//http://172.24.12.1:81/static/client/
var (
	client        *etcd.Client
	machines      = []string{"http://172.24.3.80:2379"}
	appStatusReg  = regexp.MustCompile(`/serverstatus/(agent|auth|rank|chat)/[0-9]+[0-9]`)
	gameStatusReg = regexp.MustCompile(`/serverstatus/game/[0-9]+/[0-9]+[0-9]`)
	num           = regexp.MustCompile(`[0-9]+`)

	updateAppStatusSql  = `update app_list set status=%d where id=%s`
	updateGameStatusSql = `update serverInfo set gamestatus=%d where serverid=%s and agentid=%s`
)

func setServerStatus(key string, status int) {
	switch {
	case appStatusReg.MatchString(key):
		values := num.FindString(key)
		log.Printf(updateAppStatusSql, status, values)
	case gameStatusReg.MatchString(key):
		values := num.FindAllString(key, -1)
		if len(values) == 2 {
			log.Printf(updateGameStatusSql, status, values[0], values[1])
		} else {
			log.Println("参数不够")
		}
	default:
		log.Println("不是状态key", key)
	}
}

func receive(ch chan *etcd.Response, stopCh chan bool) {
	for {
		select {
		case res := <-ch:
			if res == nil {
				continue
			}
			switch res.Action {
			case "set", "create":
				setServerStatus(res.Node.Key, 1)
				log.Println("新增或者更新")
			case "delete":
				log.Println("删除")
				setServerStatus(res.Node.Key, 0)
			}
			log.Println(res.Node, res.Action)
			// case <-time.After(20 * time.Second):
			// 	log.Println("超时")
			// 	os.Exit(-1)
			// 	return
		}
	}
}

func watch(ch chan *etcd.Response, stopCh chan bool) {
	_, err := client.Watch("/goserver", 0, true, ch, stopCh)
	if err != nil {
		log.Println(err.Error())
	}
}

func recurisve(node *etcd.Node) {
	if node.Dir {
		for _, v := range node.Nodes {
			recurisve(v)
		}
	} else {
		// log.Println(node.Key)
		setServerStatus(node.Key, 1)
	}
}

func getServerStatus() {
	if res, err := client.Get("/goserver/serverinfo", false, true); err == nil {
		recurisve(res.Node)
	} else {
		log.Println(err.Error())
	}
}

func startWatch() {

	ch := make(chan *etcd.Response)
	stopCh := make(chan bool)
	go getServerStatus()
	go receive(ch, stopCh)
	go watch(ch, stopCh)

	<-stopCh

	setServerStatus("/goserver/serverstatus/auth/100001", 1)
	setServerStatus("/goserver/serverstatus/game/100001/11", 0)
}

var (
	etcdBench = "/etcd-bench/%d"
	r         = rand.New(rand.NewSource(time.Now().Unix()))
)

type RankInfo struct {
	InsertTime int64 `json:"inserttime"`
	PlatId     int   `json:"platid"`
	ServerId   int   `json:"serverid"`
	UpdateTime int64 `json:"updatetime"`
}

func newRankInfo() RankInfo {
	return RankInfo{
		InsertTime: time.Now().Unix(),
		PlatId:     1,
		ServerId:   1,
		UpdateTime: 0,
	}
}

func insert() {
	rank := newRankInfo()
	id := r.Int()
	if b, err := json.Marshal(&rank); err == nil {
		client.Set(fmt.Sprintf(etcdBench, id), string(b), 0)
	}
}

func update() {
	//id := r.Int()
	runtime.Gosched()
}

func recurisve2(node *etcd.Node) {
	if node.Dir {
		for _, v := range node.Nodes {
			recurisve2(v)
		}
	} else {
		log.Println(node.Key)
	}
}

func main() {
	client = etcd.NewClient(machines)
	defer client.Close()
	// c := make(chan os.Signal)
	// signal.Notify(c)
	// <-c
	if strings.HasSuffix("/gosercverc/serverstatusc/game/2/1", "c") {
		log.Println("/goserver/serverstatus/game/2/1c")
	}
	if _, err := client.Set("/goserver/serverstatus/game/1/2", "172.24.16.109:8009", 0); err != nil {
		log.Fatal(err)
	}
	// if _, err := client.Set("/goserver/serverstatus/agent/11", "172.24.16.109:8009", 0); err != nil {
	// 	log.Fatal(err)
	// }
	// if _, err := client.Delete("/goserver/serverstatus/auth/8", false); err != nil {
	// 	log.Fatal(err)
	// }
	// if _, err := client.Delete("/goserver/serverstatus/", true); err != nil {
	// 	log.Fatal(err)
	// }
	// if res, err := client.Get("/root", true, true); err != nil {
	// 	log.Fatal(err)
	// } else {
	// 	recurisve2(res.Node)
	// }
}
