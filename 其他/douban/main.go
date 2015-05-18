package main

import (
	// "bufio"
	"fmt"
	// "io"
	"os"

	"github.com/PuerkitoBio/goquery"
	"github.com/hu17889/go_spider/core/common/page"
	"github.com/hu17889/go_spider/core/common/request"
	"github.com/hu17889/go_spider/core/spider"
)

type XiciProxyProcesser struct {
}

var ipFile = "ip.txt"
var fout *os.File

func (this *XiciProxyProcesser) Process(p *page.Page) {
	query := p.GetHtmlParser()
	query.Find(`table[id="ip_list"] tr`).Each(func(i int, s *goquery.Selection) {
		if i > 0 {
			str := ""
			s.Find("td").Each(func(j int, s2 *goquery.Selection) {
				if j == 2 {
					str += s2.Text() + ":"
				}
				if j == 3 {
					str += s2.Text() + "\r\n"
				}
			})

			fout.WriteString(str)
			fmt.Println(str)
		}
	})
}

var urlNT = "http://www.xici.net.co/nt/%d"
var urlNN = "http://www.xici.net.co/nn/%d"
var urlWN = "http://www.xici.net.co/wn/%d"
var urlWT = "http://www.xici.net.co/wt/%d"
var pageNumber = 5

func main() {
	sp := spider.NewSpider(&XiciProxyProcesser{}, "xici")
	sp.SetSleepTime("rand", 50, 100)
	sp.SetThreadnum(10)
	url := urlWN
	req := request.NewRequest(fmt.Sprintf(url, ""), "html", "", "GET", "", nil, nil, nil, nil)
	sp.AddRequest(req)
	for i := 2; i < pageNumber; i++ {
		req := request.NewRequest(fmt.Sprintf(url, i), "html", "", "GET", "", nil, nil, nil, nil)
		sp.AddRequest(req)
	}
	fout, _ = os.Create(ipFile)
	sp.Run()
}

type CNProxy struct{
	
}