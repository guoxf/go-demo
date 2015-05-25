package utils

import (
	"path"
)

import(
	"html/template"
)

type ControllerInterface interface {
	init(ct *Context, cn string) //初始化上下文和子类名称
	Prepare()                    //开始执行之前的一些处理
	Get()                        //method=GET的处理
	Post()                       //method=POST的处理
	Delete()                     //method=DELETE的处理
	Put()                        //method=PUT的处理
	Head()                       //method=HEAD的处理
	Patch()                      //method=PATCH的处理
	Options()                    //method=OPTIONS的处理
	Finish()                     //执行完成之后的处理
	Render() error               //执行完method对应的方法之后渲染页面
}

type Controller struct {
	Ct        *Context
	Tpl       *template.Template
	Data      map[interface{}]interface{}
	ChildName string
	TplNames  string
	Layout    []string
	TplExt    string
}

func (c *Controller)Init(ct *Context,cn string){
	c.Data=make(map[interface{}]interface{})
	c.Layout=make([]string,0)
	c.TplNames=""
	c.ChildName=cn
	c.Ct=ct
	c.TplExt="tpl"
}

func (c *Controller) Prepare(){
	
}

func (c *Controller)Finish(){
	
}

func (c *Controller) Get() {
    http.Error(c.Ct.ResponseWriter, "Method Not Allowed", 405)
}

func (c *Controller) Post() {
    http.Error(c.Ct.ResponseWriter, "Method Not Allowed", 405)
}

func (c *Controller) Delete() {
    http.Error(c.Ct.ResponseWriter, "Method Not Allowed", 405)
}

func (c *Controller) Put() {
    http.Error(c.Ct.ResponseWriter, "Method Not Allowed", 405)
}

func (c *Controller) Head() {
    http.Error(c.Ct.ResponseWriter, "Method Not Allowed", 405)
}

func (c *Controller) Patch() {
    http.Error(c.Ct.ResponseWriter, "Method Not Allowed", 405)
}

func (c *Controller) Options() {
    http.Error(c.Ct.ResponseWriter, "Method Not Allowed", 405)
}

func (c *Controller)Render()error{
	if len(c.Layout)>0{
		var filenames []string
		for _,file:=range c.Layout{
			filenames=append(filenames,path.Join(ViewsPath，file))
		}
		t,err:=template.ParseFiles(filenames...)
		if err!=nil{
			Trace("template ParseFiles err:",err)
		}
		err=t.ExecuteTemplate(c.Ct.ResponseWriter,c.TplNames,c.Data)
		if err!=nil{
			Trace("template Execute err:",err)
		}
	}else{
		if c.TplNames==""{
			c.TplNames=c.ChildName+"/"+c.Ct.Request.Method+"."+c.TplExt
		}
		t,err:=template.ParseFiles(path.Join(ViewsPath,c.TplNames))
		if err!=nil{
			Trace("template ParseFiles err:",err)
		}
		err=t.Execute(c.Ct.ResponseWriter,c.Data)
		if err!=nil{
			Trace("template Execute err:",err)
		}
	}
	return nil
}

func (c *Controller)Redirect(url string,code int){
	c.Ct.Redirect(code,url)
}