package models

import (
	"fmt"
	"time"
)

type User struct {
	Name     string
	Age      int
	Sex      bool
	BirthDay time.Time
	Revenue  float32
}

func (this *User) Display() string {
	str := "{Name:%s,Age:%d,Sex:%v,BirthDay:%s,Revenue:%f}"
	return fmt.Sprintf(str, this.Name, this.Age, this.Sex, this.BirthDay, this.Revenue)
}
