package main
import(
	"fmt"
	"github.com/drone/routes"
	"net/http"
)

func getuser(w http.ResponseWriter,r *http.Request){
	params:=r.URL.Query()
	uid:=params.Get(":uid")
	fmt.Fprintf(w,"you are get user %s",uid)
}

func modifyuser(w http.ResponseWriter,r *http.Request){
	params:=r.URL.Query()
	uid:=params.Get(":uid")
	fmt.Fprintf(w,"you are modify user %s",uid)
}

func deleteuser(w http.ResponseWriter,r *http.Request){
	params:=r.URL.Query()
	uid:=params.Get(":uid")
	fmt.Fprintf(w,"you are delete user %s",uid)
}

func adduser(w http.ResponseWriter,r *http.Request){
	params:=r.URL.Query()
	uid:=params.Get(":uid")
	fmt.Fprintf(w,"you are add user %s",uid)
}
func main(){
	mux:=routes.New()
	mux.Get("/user/:uid",getuser)
	mux.Post("/user/:uid",modifyuser)
	mux.Del("/user/:uid",deleteuser)
	mux.Put("/user/:uid",adduser)
	http.Handle("/",mux)
	http.ListenAndServe(":8080",nil)
}