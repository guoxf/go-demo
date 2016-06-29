package main

import (
	"fmt"

	"github.com/hashicorp/consul/api"
)

func main() {
	// Get a new client
	config := api.DefaultConfig()
	config.Address = "consul.plu.cn:32126"
	client, err := api.NewClient(config)
	if err != nil {
		panic(err)
	}

	// Get a handle to the KV API
	kv := client.KV()

	// PUT a new KV pair
	p := &api.KVPair{Key: "foo", Value: []byte("test")}
	_, err = kv.Put(p, nil)
	if err != nil {
		panic(err)
	}

	// Lookup the pair
	pair, _, err := kv.Get("foo", nil)
	if err != nil {
		panic(err)
	}
	fmt.Printf("KV: %v", string(pair.Value))
}
