package main

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
)

func init() {
	rand.Seed(time.Now().Unix())
	orm.RegisterDriver("mysql", orm.DRMySQL)
	orm.RegisterDataBase("default", "mysql", "admin:123456@tcp(127.0.0.1:9696)/kingshard")
	orm.RegisterModel(new(TestShardJoin))
	testDel()
}

func testBeego() {
	o := orm.NewOrm()
	var list []orm.ParamsList
	_, err := o.Raw("select id from test_shard_join limit ?,?", 0, 10).ValuesList(&list)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(list)
}

type TestShardJoin struct {
	Id   int    `orm:"column(id);pk"`
	Name string `orm:"column(name)`
}

type JoinData struct {
	Id   int
	Str  string
	Name string
}

func insertJoinData() {
	o := orm.NewOrm()
	for i := 0; i < 2; i++ {
		data := &TestShardJoin{
			Id:   rand.Intn(2500000),
			Name: "test",
		}
		_, err := o.Insert(data)
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(data)
	}
}

func testJoin() {
	o := orm.NewOrm()
	var list []JoinData
	// test_shard_hash可以为分表，test_shard_join必须是不分表
	_, err := o.Raw(`SELECT a.id,a.name,b.str FROM  test_shard_hash b
join test_shard_join a on a.id=b.id limit 0,10;`).QueryRows(&list)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(list)
}

func testUpdate() {
	var data TestShardJoin
	o := orm.NewOrm()
	err := o.QueryTable(new(TestShardJoin)).Filter("id", 1).One(&data)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("更新前", data)
	data.Name = "测试更新"
	_, err = o.Update(&data, "Name")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("更新后", data)
}

func testDel() {
	o := orm.NewOrm()
	num, err := o.Delete(&TestShardJoin{
		Id: 1698515,
	})
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("删除成功", num)
}
