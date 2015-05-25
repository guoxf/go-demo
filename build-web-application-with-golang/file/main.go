package main

import(
	"os"
	"fmt"
)

func mkdir(){
	os.Mkdir("elvin",0777)
	os.MkdirAll("elvin/test1/test2",0777)
	err:=os.Remove("elvin")
	if err!=nil{
		fmt.Println(err)
	}
	os.RemoveAll("elvin")
}
func write(){
	userFile:="elvin.txt"
	fout,err:=os.Create(userFile)
	if err!=nil{
		fmt.Println(userFile,err)
		return
	}
	defer fout.Close()
	fout.WriteAt([]byte("Just a test WriteAt!\r\n"),2)
	for i:=0;i<10;i++{
		fout.WriteString("Just a test!\r\n")
		fout.Write([]byte("Just a test!\r\n"))
	}
}
func read(){
	userFile:="elvin.txt"
	fl,err:=os.Open(userFile)
	if err!=nil{
		fmt.Println(userFile,err)
		return
	}
	defer fl.Close()
	buf:=make([]byte,1024)
	for{
		n,_:=fl.Read(buf)
		if 0==n{
			break
		}
		os.Stdout.Write(buf[:n])
	}
}
func main(){
	read()
}