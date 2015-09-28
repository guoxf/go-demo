package main

import (
	"github.com/coreos/go-etcd/etcd"
	"log"
)

func main() {
	machines := []string{"http://192.168.59.103:2379"}
	client := etcd.NewClient(machines)

	if _, err := client.Set("/foo", "bar", 0); err != nil {
		log.Fatal(err)
	}
	if res, err := client.Get("/foo", false, false); err != nil {
		log.Fatal(err)
	} else {
		log.Println(res)
	}
}
