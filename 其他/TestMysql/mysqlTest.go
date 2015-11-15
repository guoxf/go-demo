// package main

// import (
// 	"database/sql"                     //这包一定要引用
// 	"fmt"                              //这个前面一章讲过
// 	_ "github.com/go-sql-driver/mysql" //这就是刚才下载的包
// 	//"strconv"                          //这个是为了把int转换为string
// )

// func main() { //main函数

// 	db, err := sql.Open("mysql", "admin:123456@tcp(localhost:3306)/happyacc?charset=utf8")
// 	//数据库连接字符串，别告诉我看不懂。端口一定要写/
// 	if err != nil { //连接成功 err一定是nil否则就是报错
// 		panic(err.Error())       //抛出异常
// 		fmt.Println(err.Error()) //仅仅是显示异常
// 	}
// 	defer db.Close()                                                           //只有在前面用了 panic 这时defer才能起作用
// 	rows, err := db.Query("SELECT VERSION() as id, CURRENT_DATE as newstitle") //从新闻表取出两个字段
// 	if err != nil {
// 		panic(err.Error())
// 		fmt.Println(err.Error())
// 		return
// 	}

// 	defer rows.Close()
// 	var id string        //定义一个id
// 	var newstitle string //定义新闻标题
// 	//golang的rows 好比数据库的游标，需要用scan函数把对应的值扫进去.当然也可以自己循环它的属性索引不过不建议这么做。程序可读性太差
// 	for rows.Next() { //开始循环、像游标吗？必须rows.Next()哦
// 		rerr := rows.Scan(&id, &newstitle) //扫每一行，并把字段的值赋到id和newstitle里面去
// 		if rerr == nil {
// 			fmt.Println(id + newstitle) //输出来而已，看看
// 		}

// 	}
// 	fmt.Println("db is close!")
// 	db.Close() //关闭数据库 别告诉我 你不想关
// }

//数据库连接池测试
package main

import (
	"database/sql"
	"fmt"

	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	// "log"
	// "net/http"
)

var db *sql.DB

func main() {
	driverName := "mysql"
	dataSource := "admin:123456@tcp(localhost:3306)/test?charset=utf8"
	maxIdle := 20
	maxOpen := 20
	// db, _ = sql.Open(driverName, dataSource)
	// db.SetMaxOpenConns(maxIdle)
	// db.SetMaxIdleConns(maxOpen)
	// db.Ping()

	// set default database
	err := orm.RegisterDataBase("default", driverName, dataSource, maxIdle, maxOpen)
	if err != nil {
		fmt.Println(err)
	}
	// orm.RunCommand()

	// err = orm.RunSyncdb("default", false, false)
	// if err != nil {
	// 	fmt.Println(err)
	// }
}
