package main

import (
	"fmt"
	"log"

	"github.com/coreos/etcd/clientv3"
	"golang.org/x/net/context"
)

func main() {
	ExampleKV_get()
}

const (
	endpoints   = "http://etcd-discovery.plu.cn:32126/"
	dialTimeout = 10
)

func ExampleKV_get() {
	cli, err := clientv3.New(clientv3.Config{
		Endpoints:   endpoints,
		DialTimeout: dialTimeout,
	})
	if err != nil {
		log.Fatal(err)
	}
	defer cli.Close()

	ctx, cancel := context.WithTimeout(context.Background(), requestTimeout)
	resp, err := cli.Get(ctx, "discovery")
	cancel()
	if err != nil {
		log.Fatal(err)
	}
	for _, ev := range resp.Kvs {
		fmt.Printf("%s : %s\n", ev.Key, ev.Value)
	}
	// Output: foo : bar
}

func ExampleKV_delete() {
	cli, err := clientv3.New(clientv3.Config{
		Endpoints:   endpoints,
		DialTimeout: dialTimeout,
	})
	if err != nil {
		log.Fatal(err)
	}
	defer cli.Close()

	ctx, cancel := context.WithTimeout(context.Background(), requestTimeout)
	defer cancel()

	// count keys about to be deleted
	gresp, err := cli.Get(ctx, "discovery", clientv3.WithPrefix())
	if err != nil {
		log.Fatal(err)
	}

	// delete the keys
	dresp, err := cli.Delete(ctx, "discovery", clientv3.WithPrefix())
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Deleted all keys:", int64(len(gresp.Kvs)) == dresp.Deleted)
	// Output:
	// Deleted all keys: true
}
