package main

import (
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/mattn/go-sqlite3"
	_ "github.com/lib/pq"
	"database/sql"
	"fmt"
)
const(
	mysqlDriverName="mysql"
	mysqlDatasource="swtsoft:swtsoft@/test?charset=utf8"
	mysqlInsertSql="insert userinfo set username=?,departname=?,created=?"
	
	sqliteDriverName="sqlite3"
	sqliteDataSource="foo.db"
	sqliteInsertSql="insert into userinfo(username,departname,created) values(?,?,?)"
	sqliteCreateSql=`
	CREATE TABLE userinfo (
    uid INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(64) NULL,
    departname VARCHAR(64) NULL,
    created DATE NULL
);

CREATE TABLE userdeatail (
    uid INT(10) NULL,
    intro TEXT NULL,
    profile TEXT NULL,
    PRIMARY KEY (uid)
);
	`
)
func main(){
	db,err:=sql.Open(sqliteDriverName,sqliteDataSource)
	checkErr(err)
	defer db.Close()
	
//	stmt,err:=db.Prepare(sqliteCreateSql)
//	checkErr(err)
	
//	res,err:=stmt.Exec()
//	checkErr(err)
	
	stmt,err:=db.Prepare(sqliteInsertSql)
	checkErr(err)
	
	res,err:=stmt.Exec("elvin","自由职业者","2015-5-22")
	checkErr(err)
	
	id,err:=res.LastInsertId()
	checkErr(err)
	
	fmt.Println(id)
	
	stmt,err=db.Prepare("update userinfo set username=? where uid=?")
	checkErr(err)
	
	res,err=stmt.Exec("nissa",id)
	checkErr(err)
	
	affect,err:=res.RowsAffected()
	checkErr(err)
	
	fmt.Println(affect)
	
	rows,err:=db.Query("select * from userinfo")
	checkErr(err)
	
	for rows.Next(){
		var uid int
		var username string
		var department string
		var created string
		err=rows.Scan(&uid,&username,&department,&created)
		checkErr(err)
		fmt.Println(uid)
		fmt.Println(username)
		fmt.Println(department)
		fmt.Println(created)
	}
	
	stmt,err=db.Prepare("delete from userinfo where uid=?")
	checkErr(err)
	
	res,err=stmt.Exec(id)
	
	affect,err=res.RowsAffected()
	checkErr(err)
	
	fmt.Println(affect)
}

func checkErr(err error){
	if err!=nil{
		panic(err)
	}
}