package models

import "github.com/astaxie/beego/orm"

type SysCurd struct {
	CurdId                int `orm:"column(CurdId);pk"`
	Name                  string
	TableName             string `orm:"column(TableName)"`
	TitleCh               string `orm:"column(TitleCh)"`
	TitleEn               string `orm:"column(TitleEn)"`
	TitleTw               string `orm:"column(TitleTw)"`
	TitleJp               string `orm:"column(TitleJp)"`
	IsSystem              string `orm:"column(IsSystem)"`
	QuerySql              string `orm:"column(QuerySql)"`
	Type                  int
	OrderByField          string `orm:"column(OrderByField)"`
	IsAsc                 int    `orm:"column(IsAsc)"`
	ConditionNumberPerRow int    `orm:"column(ConditionNumberPerRow)"`
	EditNumberPerRow      int    `orm:"column(EditNumberPerRow)"`
	EnableGroup           int    `orm:"column(EnableGroup)"`
	TableWidth            string `orm:"column(TableWidth)"`
	PageSize              int    `orm:"column(PageSize)"`
	Filter                string
	Active                int
	CurrentEdit           int `orm:"column(CurrentEdit)"`
}
type SysCurdField struct {
	FieldId              int    `orm:"column(FieldId);pk"`
	CurdId               int    `orm:"column(CurdId)"`
	FieldName            string `orm:"column(FieldName)"`
	DisplayCh            string `orm:"column(DisplayCh)"`
	DisplayEn            string `orm:"column(DisplayEn)"`
	DisplayTw            string `orm:"column(DisplayTw)"`
	DisplayJp            string `orm:"column(DisplayJp)"`
	IsSort               int    `orm:"column(IsSort)"`
	CssClass             string `orm:"column(CssClass)"`
	Width                string `orm:"column(Width)"`
	TextAlign            string `orm:"column(TextAlign)"`
	IsShow               int    `orm:"column(IsShow)"`
	DisplayNo            string `orm:"column(DisplayNo)"`
	GroupnameCh          string `orm:"column(GroupnameCh)"`
	GroupnameEn          string `orm:"column(GroupnameEn)"`
	GroupnameTw          string `orm:"column(GroupnameTw)"`
	GroupnameJp          string `orm:"column(GroupnameJp)"`
	Length               int
	ElementType          string `orm:"column(ElementType)"`
	DateGroup            string `orm:"column(DateGroup)"`
	OptionsText          string `orm:"column(OptionsText)"`
	OptionsValue         string `orm:"column(OptionsValue)"`
	OptionsTextField     string `orm:"column(OptionsTextField)"`
	OptionsValueField    string `orm:"column(OptionsValueField)"`
	ValidRule            string `orm:"column(ValidRule)"`
	IsRequired           int    `orm:"column(IsRequired)"`
	Verifyuniqueness     int    `orm:"column(Verifyuniqueness)"`
	IsPrimaryKey         int    `orm:"column(IsPrimaryKey)"`
	DateFormat           string `orm:"column(DateFormat)"`
	Decimalplace         int    `orm:"column(Decimalplace)"`
	OptionsName          string `orm:"column(OptionsName)"`
	DataSource           string `orm:"column(DataSource)"`
	TextAreaRowCount     int    `orm:"column(TextAreaRowCount)"`
	IsAdd                int    `orm:"column(IsAdd)"`
	AddVisible           int    `orm:"column(AddVisible)"`
	AddDefaultValue      string `orm:"column(AddDefaultValue)"`
	AddReadOnly          int    `orm:"column(AddReadOnly)"`
	AddWidth             string `orm:"column(AddWidth)"`
	AddCssClass          string `orm:"column(AddCssClass)"`
	AddClickEvent        string `orm:"column(AddClickEvent)"`
	AddChangeEvent       string `orm:"column(AddChangeEvent)"`
	IsCondition          int    `orm:"column(IsCondition)"`
	ConditionWidth       string `orm:"column(ConditionWidth)"`
	ConditionCssClass    string `orm:"column(ConditionCssClass)"`
	ConditionClickEvent  string `orm:"column(ConditionClickEvent)"`
	ConditionChangeEvent string `orm:"column(ConditionChangeEvent)"`
	IsEdit               int    `orm:"column(IsEdit)"`
	EditVisible          int    `orm:"column(EditVisible)"`
	EditReadOnly         int    `orm:"column(EditReadOnly)"`
	EditWidth            string `orm:"column(EditWidth)"`
	EditCssClass         string `orm:"column(EditCssClass)"`
	EditClickEvent       string `orm:"column(EditClickEvent)"`
	EditChangeEvent      string `orm:"column(EditChangeEvent)"`
	ConditionVisible     int    `orm:"column(ConditionVisible)"`
	Active               int
}

func init() {
	orm.RegisterModel(new(SysCurd), new(SysCurdField))
}
