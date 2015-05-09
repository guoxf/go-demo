package main

import (
	"fmt"
	"github.com/PuerkitoBio/goquery"
	"github.com/hu17889/go_spider/core/common/page"
	"github.com/hu17889/go_spider/core/common/request"
	"github.com/hu17889/go_spider/core/spider"
	"reflect"
	"strings"
	"time"
)

type Movie struct {
	MovieId           int    `orm:"column(MovieId);pk"`
	MovieSummary      string `orm:"column(MovieSummary)"`
	MovieImgSrc       string `orm:"column(MovieImgSrc)"`
	MovieTitle        string `orm:"column(MovieTitle)"`
	MovieTitleEN      string `orm:"column(MovieTitle_EN)"`
	MovieTitleCN      string `orm:"column(MovieTitle_CN)"`
	MovieTitleOther   string `orm:"column(MovieTitle_Other)"`
	ProductionTime    string `orm:"column(ProductionTime)"`
	ProductionCompany string `orm:"column(ProductionCompany)"`
	DistributionFirm  string `orm:"column(DistributionFirm)"`
	ProductionArea    string `orm:"column(ProductionArea)"`
	ProductionCost    string `orm:"column(ProductionCost)"`
	ShootingLocation  string `orm:"column(ShootingLocation)"`
	ShootingDate      string `orm:"column(ShootingDate)"`
	Director          string `orm:"column(Director)"`
	ScreenWriter      string
	Producer          string    `orm:"column(Producer)"`
	MovieType         string    `orm:"column(MovieType)"`
	Starring          string    `orm:"column(Starring)"`
	RunningTime       string    `orm:"column(RunningTime)"`
	ReleaseTime       string    `orm:"column(ReleaseTime)"`
	BoxOffice         string    `orm:"column(BoxOffice)"`
	DialogueLanguage  string    `orm:"column(DialogueLanguage)"`
	Synopsis          string    `orm:"column(Synopsis)"`
	Created           time.Time `orm:"auto_now_add;type(datetime)"`
	Updated           time.Time `orm:"auto_now;type(datetime)"`
	XuandyId          int       `orm:"column(XuandyId)"`
}

var dict = make(map[string]string)

type BaiduBaikeProcesser struct {
}

func NewBaiduBaikeProcesser() *BaiduBaikeProcesser {
	return &BaiduBaikeProcesser{}
}

func (this *BaiduBaikeProcesser) Process(p *page.Page) {
	if !p.IsSucc() {
		println(p.Errormsg())
		return
	}
	var movie Movie
	a := reflect.ValueOf(&movie).Elem()

	query := p.GetHtmlParser()
	title := query.Find("div.lemmaTitleH1 span").First().Text()
	fmt.Println(title)
	lemmaContent := query.Find(`div[id="lemmaContent-0"]`)
	summary := ""
	lemmaContent.ChildrenFiltered(".para").Each(func(i int, s *goquery.Selection) {
		summary += s.Text() + "\r\n"
	})
	fmt.Println(summary)
	baseInfoWrap := lemmaContent.Find(`div[id="baseInfoWrapDom"]`)
	leftItem := baseInfoWrap.Find(`div.baseInfoLeft`).Find("div.biItem")
	leftItem.Each(func(i int, s *goquery.Selection) {
		key := s.Find(".biItemInner .biTitle").Text()
		key = strings.Replace(key, "    ", "", -1)
		val, isExists := dict[key]
		if isExists {
			fmt.Println(key, "/", val, s.Find(".biItemInner .biContent").Text())
			a.FieldByName(val).SetString(s.Find(".biItemInner .biContent").Text())
		} else {
			fmt.Println(key, s.Find(".biItemInner .biContent").Text())
		}
	})
	rightItem := baseInfoWrap.Find(`div.baseInfoRight`).Find("div.biItem")
	rightItem.Each(func(i int, s *goquery.Selection) {
		key := s.Find(".biItemInner .biTitle").Text()
		key = strings.Replace(key, "    ", "", -1)
		val, isExists := dict[key]
		if isExists {
			fmt.Println(key, "/", val, s.Find(".biItemInner .biContent").Text())
			a.FieldByName(val).SetString(s.Find(".biItemInner .biContent").Text())
		} else {
			fmt.Println(key, s.Find(".biItemInner .biContent").Text())
		}
	})
	lemmaContent.Find("div.movie-plot").ChildrenFiltered(".para").Each(func(i int, s *goquery.Selection) {
		fmt.Println(s.Text())
	})
	fmt.Println(movie)
}
func main() {
	sp := spider.NewSpider(NewBaiduBaikeProcesser(), "BaiduBaike")
	req := request.NewRequest("http://baike.baidu.com/search/word?word=战狼", "html", "", "GET", "", nil, nil, nil, nil)
	sp.AddRequest(req)
	sp.Run()
}
func init() {
	dict["中文名"] = "MovieTitleCN"
	dict["外文名"] = "MovieTitleEN"
	dict["其它译名"] = "MovieTitleOther"
	dict["出品时间"] = "ProductionTime"
	dict["出品公司"] = "ProductionCompany"
	dict["发行公司"] = "DistributionFirm"
	dict["制片地区"] = "ProductionArea"
	dict["制片成本"] = "ProductionCost"
	dict["拍摄地点"] = "ShootingLocation"
	dict["拍摄日期"] = "ShootingDate"
	dict["导演"] = "Director"
	dict["编剧"] = "ScreenWriter"
	dict["制片人"] = "Producer"
	dict["类型"] = "MovieType"
	dict["主演"] = "Starring"
	dict["片长"] = "RunningTime"
	dict["上映时间"] = "ReleaseTime"
	dict["票房"] = "BoxOffice"
	dict["对白语言"] = "DialogueLanguage"
}
