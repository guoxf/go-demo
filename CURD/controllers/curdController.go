package controllers

import (
	"CURD/models"
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

type CURDController struct {
	beego.Controller
}

func (this *CURDController) Get() {
	o := orm.NewOrm()
	//o.Using("elvin_nissa")
	var (
		sysCurd []*models.SysCurd
		//sysCurdField []*models.SysCurdField
	)
	//curd := make(map[string]interface{})

	num, err := o.QueryTable("SysCurd").All(&sysCurd)
	fmt.Printf("Returned Rows Num: %s, %s", num, err)

	// num, err = o.QueryTable("SysCurdField").All(&sysCurdField)
	// fmt.Printf("Returned Rows Num: %s, %s", num, err)

	//curd["SysCurd"] = &sysCurd
	//curd["SysCurdField"] = &sysCurdField
	this.Data["json"] = &sysCurd

	this.ServeJson()
}

func (this *CURDController) GetFields() {

}

func (this *CURDController) GetConfig() {
	name := this.GetString("name")
	beego.Info("Config Name:", name)
	o := orm.NewOrm()
	var (
		sysCurd      models.SysCurd
		sysCurdField []*models.SysCurdField
	)
	curd := make(map[string]interface{})
	err := o.QueryTable("SysCurd").Filter("name", name).One(&sysCurd)
	fmt.Printf("Returned Rows Num: %s", err)
	var num int64
	if err == nil {
		num, err = o.QueryTable("SysCurdField").Filter("CurdId", sysCurd.CurdId).OrderBy("DisplayNo").All(&sysCurdField)
		fmt.Printf("Returned Rows Num: %s, %s", num, err)
	}
	curd["SysCurd"] = &sysCurd
	curd["SysCurdField"] = &sysCurdField
	this.Data["json"] = curd
	this.ServeJson()
}

func (this *CURDController) Query() {
	name := this.GetString("name")
	//pageIndex := this.GetString("pageIndex")
	//pageSize := this.GetString("pageSize")
	filter := this.GetString("fieldName")
	o := orm.NewOrm()
	var (
		sysCurd      models.SysCurd
		sysCurdField []*models.SysCurdField
	)
	result := make(map[string]interface{})
	err := o.QueryTable("SysCurd").Filter("name", name).One(&sysCurd)
	var num int64
	if err == nil {
		num, err = o.QueryTable("SysCurdField").Filter("CurdId", sysCurd.CurdId).Filter("FieldName", filter).OrderBy("DisplayNo").All(&sysCurdField)
	}
	result["data"] = &sysCurdField
	result["totalRecord"] = num
}

func (this *CURDController) Update() {

}

func (this *CURDController) Delete() {
	var ob map[string]interface{}
	json.Unmarshal([]byte(this.Ctx.Input.RequestBody), &ob)
	data := ob["data"].(map[string]interface{})
	fmt.Println(data["Active"])
	fmt.Println("delete")
}

func (this *CURDController) Active() {

}
