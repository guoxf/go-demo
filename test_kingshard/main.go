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
	//	_, err = db.Exec(`begin;insert into test_shard_hash(id,str,f,e,u,i) values(16,"flike",3.14,'test2',2,3);
	//insert into test_shard_hash(id,str,f,e,u,i) values(17,"flike",3.14,'test2',2,3);commit;`)
	//	if err != nil {
	//		panic(err.Error()) // proper error handling instead of panic in your app
	//	}

	// Insert square numbers for 0-24 in the database
	for i := 0; i < 2500000; i++ {
		strSql := fmt.Sprintf(`insert into test_shard_hash(id,str,f,e,u,i) values(%d,"flike",3.14,'test2',2,3);`, i+1)
		_, err = db.Exec(strSql)
		if err != nil {
			fmt.Println(err.Error()) // proper error handling instead of panic in your app
		}
	}
}
