package main

import (
	"github.com/astaxie/beego"
	"github.com/influxdata/influxdb/client/v2"
)

const (
	MyDB     = "band_width"
	username = "root"
	password = "root"
)

var influxdbClient client.Client

func initInfluxdb() {
	// Make client
	var err error
	influxdbClient, err = client.NewHTTPClient(client.HTTPConfig{
		Addr:     "http://127.0.0.1:8086",
		Username: username,
		Password: password,
	})

	if err != nil {
		beego.Error("Error: ", err)
		panic(err)
	}
}

func sendToInfluxdb() {
	if influxdbClient == nil {
		return
	}
	// Create a new point batch
	bp, err := client.NewBatchPoints(client.BatchPointsConfig{
		Database:  MyDB,
		Precision: "s",
	})

	if err != nil {
		beego.Error("Error: ", err)
	}

	// Create a point and add to batch
	tags := map[string]string{"test": "test"}
	fields := map[string]interface{}{
		"idle":   10.1,
		"system": 53.3,
		"user":   46.6,
	}
	pt, err := client.NewPoint("test", tags, fields)

	if err != nil {
		beego.Error("Error: ", err)
	}

	bp.AddPoint(pt)

	// Write the batch
	beego.Error(influxdbClient.Write(bp))
}
