package main

import (
	"fmt"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"net/url"
	"time"
	"upper.io/db"
	"upper.io/db/mongo"
)

var (
	host           = "127.0.0.1:27017"
	database       = "test"
	userAccount    = "admin"
	pwd            = "123"
	collectionName = "test"
)

var settings = mongo.ConnectionURL{
	Address:  db.Host(host), // MongoDB hostname.
	Database: database,      // Database name.
}

type UserBaseInfo struct {
	UserId          int64  `bson:"lUserId"`
	UserName        string `bson:"sUserName"`
	CreateTime      int    `bson:"nCreateTime"`
	LastOnlineTime  int    `bson:"nLastOnlineTime"`
	LastRefreshTime int    `bson:"nLastRefreshTime"`
	LastTime        int    `bson:"nLastTime"`
}

func main() {
	switchDB()
}

var (
	regexCondition   = db.Cond{"sUserName": bson.M{"$regex": "无畏"}}
	inCondition      = db.Cond{"sUserName": bson.M{"$in": []string{"寡言的安杰儿", "无畏的柯丝莫"}}}
	ninCondition     = db.Cond{"sUserName": bson.M{"$nin": []string{"寡言的安杰儿", "无畏的柯丝莫"}}}
	betweenCondition = db.And{
		db.Cond{"nCreateTime >=": 1442322159},
		db.Cond{"nCreateTime <=": 1442323159},
	}
	orCondition = db.Or{
		db.Cond{"sUserName": bson.M{"$regex": "无畏"}},
		db.Cond{"sUserName": "寡言的安杰儿"},
	}
)

func useUpper() {
	sess, err := db.Open(mongo.Adapter, settings)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	defer sess.Close()

	collection, err := sess.Collection(collectionName)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	res := collection.Find(ninCondition)
	fmt.Println(res.Count())
	var userInfo []UserBaseInfo
	res.Sort("-lUserId") //排序
	err = res.Limit(10).All(&userInfo)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(userInfo)
}

func switchDB() {
	sess, err := db.Open(mongo.Adapter, settings)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	defer sess.Close()

	collection, err := sess.Collection(collectionName)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	res := collection.Find(inCondition)
	fmt.Println(res.Count())
	var userInfo []UserBaseInfo
	err = res.Limit(10).All(&userInfo)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(userInfo)

	sess.Use("test2")
	fmt.Println(sess.Collections())
	collection, err = sess.Collection(collectionName)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	res = collection.Find()
	var m []map[string]interface{}
	err = res.Limit(10).All(&m)
	if err != nil {
		fmt.Println(err)
		return
	}
	for _, v := range m {
		for _, obj := range v {
			fmt.Printf("%+T ", obj)
		}
	}
}

//Url=>mongodb://admin:1111@127.0.0.1:27017/test
func useMgo() {
	user := url.UserPassword(userAccount, pwd)

	var u url.URL
	u.Scheme = "mongodb"
	u.Host = host
	u.Path = database
	u.User = user

	fmt.Println(u.String())
	sess, err := mgo.DialWithTimeout(u.String(), time.Second*5)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	defer sess.Close()

	collection := sess.DB("").C(collectionName)
	res := collection.Find(bson.M{"sUserName": bson.M{"$regex": "无畏"}})
	fmt.Println(res.Count())

	var userInfo []UserBaseInfo
	err = res.Limit(10).All(&userInfo)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(userInfo)
}
