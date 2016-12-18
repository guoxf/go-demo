package main

import (
	"fmt"
	"net/http"

	"github.com/hashicorp/consul/api"
)

func main() {
	startServer()
}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("hello Web3! This is n3")
	fmt.Fprintf(w, "Hello Web3! This is n3")
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("health check!")
}

func startServer() {
	config := api.DefaultConfig()
	client, err := api.NewClient(config)
	if err != nil {
		panic(err)
	}
	agent := client.Agent()
	defer func() {
		fmt.Println("11")
		if err := agent.ServiceDeregister("foo"); err != nil {
			fmt.Println(err)
		}
	}()

	if err = agent.ServiceRegister(&api.AgentServiceRegistration{
		Name: "foo",
		Tags: []string{"bar", "baz"},
		Port: 10000,
		Check: &api.AgentServiceCheck{
			TCP:      ":10000",
			Interval: "1s",
		},
	}); err != nil {
		panic(err)
	}

	// go func() {
	// 	for {
	// 		select {
	// 		case <-time.After(time.Second):
	// 			getService()
	// 		}
	// 	}
	// }()

	http.HandleFunc("/hello", handler)
	http.HandleFunc("/health", healthHandler)
	http.ListenAndServe(":10000", nil)
}

func getService() {
	client, err := api.NewClient(api.DefaultConfig())
	if err != nil {
		panic(err)
	}
	if checks, err := client.Agent().Checks(); err != nil {
		panic(err)
	} else {
		for k, v := range checks {
			if v.Status != api.HealthPassing {
				fmt.Println(k, v)
			}
		}
	}
}

func kv() {
	// Get a new client
	config := api.DefaultConfig()
	config.Address = "127.0.0.1"
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
