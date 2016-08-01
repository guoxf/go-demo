package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"os"
	"reflect"
	"strconv"
	"strings"

	"gopkg.in/olivere/elastic.v3"
)

var (
	host = flag.String("host", "127.0.0.1", "Elasticsearch Host")
)

func newClient() *elastic.Client {
	client, err := elastic.NewSimpleClient(
		elastic.SetURL(fmt.Sprintf("http://%s", *host)),
	)
	if err != nil {
		// Handle error
		panic(err)
	}

	// Create an index
	_, err = client.CreateIndex("band_width").Do()
	if err != nil {
		// Handle error
		// panic(err)
	}
	return client
}

func main() {
	flag.Parse()
	client := newClient()
	add(client)
}

func add(client *elastic.Client) {
	bulkService := client.Bulk()
	resp, err := bulkService.Add(elastic.NewBulkIndexRequest().Index("band_width").Type("11").Doc(BandWidth{
		StreamType:    12,
		RoomAlias:     "",
		PullTime:      1469092431,
		Fps:           25,
		StreamName:    "",
		Rate:          1253880,
		Hists:         11,
		DeployAddress: "123.126.122.110",
		InAddress:     "42.7.138.190",
		BandWidth:     915670,
		Lfr:           0,
	})).
		Add(elastic.NewBulkIndexRequest().Index("band_width").Type("1").Doc(BandWidth{
			StreamType:    12,
			RoomAlias:     "",
			PullTime:      1469092431,
			Fps:           25,
			StreamName:    "",
			Rate:          1253880,
			Hists:         11,
			DeployAddress: "123.126.122.110",
			InAddress:     "42.7.138.190",
			BandWidth:     915670,
			Lfr:           0,
		})).Do()
	if err != nil {
		// Handle error
		panic(err)
	}
	fmt.Println(resp)
}

func NewRangeDateQuery(field string, value interface{}) elastic.Query {
	if strings.HasSuffix(field, "__datetime") {
		startEnd := strings.Split(value.(string), "-")
		field = strings.Replace(field, "__datetime", "", 1)
		if len(startEnd) == 2 {
			start, err := strconv.ParseInt(startEnd[0], 10, 64)
			if err != nil {
				return nil
			}
			end, err := strconv.ParseInt(startEnd[1], 10, 64)
			if err != nil {
				return nil
			}
			rangeQuery := elastic.NewRangeQuery(field)
			rangeQuery.Gte(start).Lt(end)
			return rangeQuery
		}
	}
	return nil
}

func NewExactQuery(field string, value interface{}) elastic.Query {
	if strings.HasSuffix(field, "__exact") {
		field = strings.Replace(field, "__exact", "", 1)
		return elastic.NewTermQuery(field, value)
	}
	return nil
}

type NewQueryFunc func(string, interface{}) elastic.Query

var funcs = make([]NewQueryFunc, 0)

func RegisterNewQueryFunc(f NewQueryFunc) {
	funcs = append(funcs, f)
}

func NewQuery(field string, value interface{}) elastic.Query {
	for i := range funcs {
		query := funcs[i](field, value)
		if query != nil {
			return query
		}
	}
	return nil
}

func SetQuery(searchService *elastic.SearchService, query map[string]interface{}) *elastic.SearchService {
	for k, v := range query {
		q := NewQuery(k, v)
		if q != nil {
			searchService.Query(q)
		}
	}
	return searchService
}

func search(client *elastic.Client) {
	// Search with a term query
	query := map[string]interface{}{
		"RoomAlias__exact":   "0444ca5921df4e81a748560ca2eddc2f",
		"PullTime__datetime": "1469071330-1469099990",
	}

	searchService := client.Search().Index("band_width")
	searchService = SetQuery(searchService, query)
	searchResult, err := searchService.Sort("PullTime", true).
		From(9000).Size(10).
		Pretty(true).
		Do()
	if err != nil {
		// Handle error
		panic(err)
	}
	// searchResult is of type SearchResult and returns hits, suggestions,
	// and all kinds of other information from Elasticsearch.
	fmt.Printf("Query took %d milliseconds\n", searchResult.TookInMillis)
	// Each is a convenience function that iterates over hits in a search result.
	// It makes sure you don't need to check for nil values in the response.
	// However, it ignores errors in serialization. If you want full control
	// over iterating the hits, see below.
	var ttyp BandWidth
	for _, item := range searchResult.Each(reflect.TypeOf(ttyp)) {
		fmt.Println(item)
		if t, ok := item.(BandWidth); ok {
			fmt.Printf("BandWidth by %s: %s\n", t.RoomAlias, t.StreamName)
		}
	}
	// TotalHits is another convenience function that works even when something goes wrong.
	fmt.Printf("Found a total of %d BandWidth\n", searchResult.TotalHits())

	// Here's how you iterate through results with full control over each step.
	if searchResult.Hits.TotalHits > 0 {
		fmt.Printf("Found a total of %d BandWidth\n", searchResult.Hits.TotalHits)

		// Iterate through results
		for _, hit := range searchResult.Hits.Hits {
			// hit.Index contains the name of the index

			// Deserialize hit.Source into a Tweet (could also be just a map[string]interface{}).
			var t BandWidth
			err := json.Unmarshal(*hit.Source, &t)
			if err != nil {
				// Deserialization failed
			}
			// Work with tweet
			fmt.Printf("BandWidth by %s: %s\n", t.RoomAlias, t.StreamName)
		}
	} else {
		// No hits
		fmt.Print("Found no BandWidth\n")
	}
}

func exitIfErr(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %s\n", err.Error())
		os.Exit(1)
	}
}

type BandWidth struct {
	Id            string  `json:"_id" bson:"_id"`
	StreamType    int     `json:"StreamType" bson:"StreamType"`
	RoomAlias     string  `json:"RoomAlias" bson:"RoomAlias"`
	PullTime      int64   `json:"PullTime" bson:"PullTime"`
	Fps           int     `json:"Fps" bson:"Fps"`
	StreamName    string  `json:"StreamName" bson:"StreamName"`
	Rate          int     `json:"Rate" bson:"Rate"`
	Hists         int     `json:"Hists" bson:"Hists"`
	DeployAddress string  `json:"DeployAddress" bson:"DeployAddress"`
	InAddress     string  `json:"InAddress" bson:"InAddress"`
	BandWidth     int     `json:"BandWidth" bson:"BandWidth"`
	Lfr           float32 `json:"Lfr" bson:"Lfr"`
}
