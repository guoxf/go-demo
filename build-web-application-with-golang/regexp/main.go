package main
import(
	"regexp"
	"io/ioutil"
	"net/http"
	"fmt"
	"strings"
)

func IsIp(ip string)(b bool){
	pattern:="^[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}$"
	if m,_:=regexp.MatchString(pattern,ip);!m{
		return false
	}
	return true
}
func spider(){
	resp,err:=http.Get("http://baidu.com")
	if err!=nil{
		fmt.Println("http get error.")
	}
	defer resp.Body.Close()
	body,err:=ioutil.ReadAll(resp.Body)
	if err!=nil{
		fmt.Println("http read error")
		return 
	}
	src:=string(body)
	
	re,_:=regexp.Compile("\\<[\\S\\s]+?\\>")
	src=re.ReplaceAllStringFunc(src,strings.ToLower)
	
	re,_=regexp.Compile("\\<style[\\S\\s]+?\\</script\\>")
	src=re.ReplaceAllString(src,"")
	
	re,_=regexp.Compile("\\<script[\\S\\s]+?\\</script\\>")
	src=re.ReplaceAllString(src,"")
	
	re,_=regexp.Compile("\\<[\\S\\s]+?\\>")
	src=re.ReplaceAllString(src,"\n")
	
	re,_=regexp.Compile("\\s{2,}")
	src=re.ReplaceAllString(src,"\n")
	
	fmt.Println(strings.TrimSpace(src))
}
func compile(){
	a:="I am learning Go language"
	re,_:=regexp.Compile("[a-z]{2,4}")
	//
	one:=re.Find([]byte(a))
	fmt.Println("Find:",string(one))
	//
	all:=re.FindAll([]byte(a),-1)
	fmt.Print("FindAll:")
	for _,v:=range all{
		fmt.Print(string(v)," ")
	}
	fmt.Println()
	//
	index:=re.FindIndex([]byte(a))
	fmt.Println("FindIndex:",index)
	//
	allindex:=re.FindAllIndex([]byte(a),-1)
	fmt.Println(allindex)
	//
	
	re2,_:=regexp.Compile("am(.*)lang(.*)")
	//查找Submatch,返回数组，第一个元素是匹配的全部元素，第二个元素是第一个()里面的，第三个是第二个()里面的
    //下面的输出第一个元素是"am learning Go language"
    //第二个元素是" learning Go "，注意包含空格的输出
    //第三个元素是"uage"
	submatch:=re2.FindSubmatch([]byte(a))
	fmt.Println("FindSubmatch:",submatch)
	for _,v:=range submatch{
		fmt.Println(string(v))
	}
	
	//
	submatchindex:=re2.FindSubmatchIndex([]byte(a))
	fmt.Println(submatchindex)
	
	submatchall:=re2.FindAllSubmatch([]byte(a),-1)
	fmt.Println(submatchall)
	
	submatchallindex:=re2.FindAllSubmatchIndex([]byte(a),-1)
	fmt.Println(submatchallindex)
}
func expand(){
	src := []byte(`
        call hello alice
        hello bob
        call hello eve
    `)
	pat:=regexp.MustCompile(`(?m)(call)\s+(?P<cmd>\w+)\s+(?P<arg>.+)\s*$`)
	res:=[]byte{}
	for _,s:=range pat.FindAllSubmatchIndex(src,-1){
		res=pat.Expand(res,[]byte("$cmd('$arg')\n"),src,s)
	}
	fmt.Println(string(res))
}
func getUid(key string)(string){
	re,_:=regexp.Compile("[0-9]+")
	return re.FindString(key)
}
func main(){
//	fmt.Println(IsIp("992.168.1.2"))
//	spider()
	fmt.Println(getUid("user:352:baseInfo1222"))
}