package main

import (
	"fmt"
	"reflect"
	"time"

	"GoDemo/models"
)

func main() {
	name := "Elvin"
	fmt.Println("name type is ", reflect.TypeOf(name).Name())
	fmt.Println("name value is ", reflect.ValueOf(name).String())

	user := new(models.User)
	user.Name = "Elvin"
	user.Age = 22
	user.Sex = true
	user.Revenue = 100000.222
	user.BirthDay = time.Now()
	fmt.Println("********** User **********")
	fmt.Println()
	fmt.Println(user)
	fmt.Println()
	fmt.Println("****************************")

	u := reflect.ValueOf(user).Elem() //结构体取值
	fmt.Println(u.Type())
	fmt.Println()
	numField := u.NumField()
	fmt.Println("User have ", numField, " field")
	fmt.Println()
	ty := reflect.TypeOf(user)
	str := "User.%s type is %s,value is %v \r\n"
	for i := 0; i < numField; i++ {
		name := u.Field(i).Type().Name()
		switch name {
		case "string":
			fmt.Printf(str, ty.Elem().Field(i).Name, name, u.Field(i).String())
		case "int":
			fmt.Printf(str, ty.Elem().Field(i).Name, name, u.Field(i).Int())
		case "float32":
			fmt.Printf(str, ty.Elem().Field(i).Name, name, u.Field(i).Float())
		case "bool":
			fmt.Printf(str, ty.Elem().Field(i).Name, name, u.Field(i).Bool())
		case "time.Time Value":
			fmt.Printf(str, ty.Elem().Field(i).Name, name, u.Field(i).Elem().String())
		default:
			fmt.Printf(str, ty.Elem().Field(i).Name, name, u.Field(i).String())
		}
	}
	fmt.Println()

	fmt.Print("User.Name type is ", u.FieldByName("Name").Type())
	fmt.Println(",value is ", u.FieldByName("Name").String())
	fmt.Println("User.Name can set ", u.FieldByName("Name").CanSet())
	if u.FieldByName("Name").CanSet() {
		u.FieldByName("Name").SetString("Hello Elvin")
		fmt.Println("User.Name new value is", u.FieldByName("Name").String())
	}
	fmt.Println()

	fmt.Print("User.Age type is ", u.FieldByName("Age").Type())
	fmt.Println(",value is ", u.FieldByName("Age").Int())
	fmt.Println()

	fmt.Print("User.Sex type is ", u.FieldByName("Sex").Type())
	fmt.Println(",value is ", u.FieldByName("Sex").Bool())
	fmt.Println()

	fmt.Print("User.Revenue type is ", u.FieldByName("Revenue").Type())
	fmt.Println(",value is ", u.FieldByName("Revenue").Float())
	fmt.Println()

	fmt.Print("User.BirthDay type is ", u.FieldByName("BirthDay").Type())
	fmt.Println(",value is ", u.FieldByName("BirthDay").String())
	fmt.Println()

	fmt.Println("User have ", reflect.ValueOf(user).NumMethod(), " Method")
	fmt.Println()
	//获取方法，调用方法
	fmt.Println("User.Display type is ", reflect.ValueOf(user).MethodByName("Display"))
	fmt.Println("Call func result ", reflect.ValueOf(user).MethodByName("Display").Call([]reflect.Value{}))
	fmt.Println()

}
