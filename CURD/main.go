package main

import (
	//"PageConfig/routers"
	"CURD/controllers"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	beego.SetStaticPath("/views/AngularDemo", "views/AngularDemo")
	// orm.Debug = true
	beego.Router("/", &controllers.MainController{})
	beego.Router("/CURD/", &controllers.CURDController{})
	beego.Router("/CURD/getConfig", &controllers.CURDController{}, "get:GetConfig")
	beego.Router("/CURD/Query", &controllers.CURDController{}, "get:Query")
	beego.Router("/CURD/Update", &controllers.CURDController{}, "post:Update")
	beego.Router("/CURD/Delete", &controllers.CURDController{}, "post:Delete")
	beego.Router("/CURD/Active", &controllers.CURDController{}, "post:Active")
	beego.Run()
}

func init() {
	orm.RegisterDriver("mysql", orm.DR_MySQL)
	orm.RegisterDataBase("default", "mysql", "root:123456@/elvin_nissa?charset=utf8")
}
