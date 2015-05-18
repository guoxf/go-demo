package routers

import (
	"CURD/controllers"
	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/CURD/", &controllers.CURDController{})
	beego.Router("/CURD/:id:int", &controllers.CURDController{}, "get:GetConfig")
}
