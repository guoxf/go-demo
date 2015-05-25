package main
import(
	"net"
	"os"
	"fmt"
)

func parseIP(){
	addr:=net.ParseIP("127.0.0.1")
	if addr==nil{
		fmt.Println("Invalid address")
	}else{
		fmt.Println("The address is ",addr.String())
	}
	os.Exit(0)
}

func main(){
	parseIP()
}