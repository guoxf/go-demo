package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"os"

	elastigo "github.com/mattbaird/elastigo/lib"
)

var (
	host *string = flag.String("host", "localhost", "Elasticsearch Host")
)

func main() {
	c := elastigo.NewConn()
	log.SetFlags(log.LstdFlags)
	flag.Parse()

	// Trace all requests
	c.RequestTracer = func(method, url, body string) {
		log.Printf("Requesting %s %s", method, url)
		log.Printf("Request body: %s", body)
	}

	fmt.Println("host = ", *host)
	// Set the Elasticsearch Host to Connect to
	c.Domain = *host

	//	// Index a document
	//	_, err := c.Index("testindex", "user", "docid_1", nil, `{"name":"bob"}`)
	//	exitIfErr(err)

	//	// Index a doc using a map of values
	//	_, err = c.Index("testindex", "user", "docid_2", nil, map[string]string{"name": "venkatesh"})
	//	exitIfErr(err)

	//	// Index a doc using Structs
	//	_, err = c.Index("testindex", "user", "docid_3", nil, MyUser{"wanda", 22})
	//	exitIfErr(err)

	// Search Using Raw json String
	//searchJson := `{"query":{"bool":{"must":[{"term":{"Name":"wanda"}}],"must_not":[],"should":[]}},"from":0,"size":10,"sort":[],"aggs":{}}`
	searchJson := `{"query":{"bool":{"must":[{"match_all":{}}],"must_not":[],"should":[]}},"from":0,"size":10,"sort":[],"aggs":{}}`
	out, err := c.Search("testindex", "user", nil, searchJson)
	var myUser []MyUser
	if len(out.Hits.Hits) == 1 {
		json.Unmarshal(*out.Hits.Hits[0].Source, &myUser)
		fmt.Printf("%#v\n", myUser)
	}
	fmt.Println(string(out.RawJSON))
	exitIfErr(err)
}

func exitIfErr(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %s\n", err.Error())
		os.Exit(1)
	}
}

type MyUser struct {
	Name string
	Age  int
}
