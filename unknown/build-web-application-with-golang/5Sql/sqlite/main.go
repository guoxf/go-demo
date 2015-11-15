package main

import(
	"database/sql"
	"fmt"
	_ "github.com/mattn/go-sqlite3"
)

func main(){
	db,err:=sql.Open("sqlite3","foo.db")
	checkErr(err)
	
	stmt,err:=db.Prepare("insert into userinfo(username,department,created) values(?,?,?)")
	checkErr(err)
	
	res,err:=stmt.Exec("elvin","自由职业者","2015-5-22")
	checkErr(err)
}
func checkErr(err error){
	if err!=nil{
		panic(err)
	}
}