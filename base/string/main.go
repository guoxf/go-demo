package main
 import(
	"fmt"
	"os"
)
type point struct{
	x,y int
}
func main(){
	p:=point{1,2}
	fmt.Printf("%v\n",p)
	fmt.Printf("%+v\n",p)
	fmt.Printf("%#v\n",p)
	fmt.Printf("%T\n",p)
	fmt.Printf("%t\n",true)
	fmt.Printf("%d\n",123)
	fmt.Printf("%b\n",123)//二进制
	fmt.Printf("%c\n",33)//码
	fmt.Printf("%x\n",16)//HEX编码
	fmt.Printf("%f\n",23.112)
	fmt.Printf("%E\n",1200000.0)
	fmt.Printf("%e\n",1200000.0)
	fmt.Printf("%s\n","\"string\"")
	fmt.Printf("%q\n","string")
	fmt.Printf("%x\n","hex this")
	fmt.Printf("%p\n",&p)
	fmt.Printf("|%6d|%6d|\n",12,34111)
	fmt.Printf("|%6.2f|%6.2f|\n",1.2,1.45)
	fmt.Printf("|%-6.2f|%-6.2f|\n",1.2,1.45)
	fmt.Fprintf(os.Stdout,"an %s\n","error")
}