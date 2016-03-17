package main

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", "admin:123456@tcp(127.0.0.1:9696)/kingshard")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	testShardYear(db)
}

func testShardYear(db *sql.DB) {
	n := 5
	count := 100
	num := 5000
	ch := make(chan bool, count*n)
	for i := 0; i < n; i++ {
		for j := 0; j < count; j++ {
			go func(k, y int) {
				for i := k * num * y; i < (k+1)*num*y; i++ {
					strSql := fmt.Sprintf(`insert into test_shard_year(id,name,ctime,ctime2) values(%d,"hello","201%d-02-22 13:23:45","201%d-02-22 13:23:45");`, i+1, y+n, y+n)
					_, err := db.Exec(strSql)
					if err != nil {
						fmt.Println(err.Error()) // proper error handling instead of panic in your app
					}
				}
				ch <- true
			}(j, i)
		}
	}
	for i := 0; i < count*n; i++ {
		<-ch
	}
}

func testRange(db *sql.DB) {
	count := 1000
	num := 2500
	ch := make(chan bool, count)
	// Insert square numbers for 0-24 in the database
	for i := 0; i < count; i++ {
		go func(n int) {
			for i := n * num; i < (n+1)*num; i++ {
				strSql := fmt.Sprintf(`insert into test_shard_range(id,str,f,e,u,i) values(%d,"flike",3.14,'test2',2,3);`, i+1)
				_, err := db.Exec(strSql)
				if err != nil {
					fmt.Println(err.Error()) // proper error handling instead of panic in your app
				}
			}
			ch <- true
		}(i)
	}
	for i := 0; i < count; i++ {
		<-ch
	}
}

func testHash(db *sql.DB) {
	count := 1000
	num := 2500
	ch := make(chan bool, count)
	// Insert square numbers for 0-24 in the database
	for i := 0; i < count; i++ {
		go func(n int) {
			for i := n * num; i < (n+1)*num; i++ {
				strSql := fmt.Sprintf(`insert into test_shard_hash(id,str,f,e,u,i) values(%d,"flike",3.14,'test2',2,3);`, i+1)
				_, err := db.Exec(strSql)
				if err != nil {
					fmt.Println(err.Error()) // proper error handling instead of panic in your app
				}
			}
			ch <- true
		}(i)
	}
	for i := 0; i < count; i++ {
		<-ch
	}
}
