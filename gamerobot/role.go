package main

import "time"

type Role struct {
	//用户id
	UserId int `bson:"userid"`
	//角色id
	RoleId int `bson:"roleid"`
	//角色名
	RoleName string `bson:"rolename"`
	//金币
	Coin int `bson:"coin"`
	//是否vip
	IsVip bool `bson:"isvip"`
	//vip等级？
	VipLevel int `bson:"viplevel"`
	//建角时间
	CreateTime time.Time `bson:"createtime"`

	//上阵英雄
	Format [4][]int `bson:"format"`
	//当前使用的阵型
	CurrentFormat int `bson:"currentformat"`
	//英雄
	Heros []Hero `bson:"heros"`
	//各种道具
	//血钻
	//宿命武器Id
	DestinyEquips [11]int
	//当前使用的宿命武器id
	CurrentDestiny int
	//宿命锻造等级
	ForgeLevel int
	//力量徽记等级
	PowerBadge int
	//勇气徽记等级
	CourageBadge int
	//冠军徽记等级
	ChampionBage int
	//锻造徽记等级
	ForgeBage int
}

//上移，当前序号+id？
func (role *Role) Up(heroId int) {}

//下移
func (role *Role) Down(heroId int) {}

//插入
//index 插入位置
func (role *Role) Insert(index, heroId int) {}

//休息英雄排序
func (role *Role) Sort() {}

//上阵，要判断最大上阵数量
func (role *Role) UpFormat(heroId int) {}

//下阵
func (role *Role) DownFormat(heroId int) {}

//总战力
func (role *Role) Combat() {}

//新增英雄，要判断是否唯一属性
func (role *Role) AddHero() {}

//宿命锻造
func (role *Role) DestinyForge() {}

type Hero struct {
	HeroId int `bson:"heroid"`
	//产品配置里面设置的id
	ConfigId int `bson:"configid"`
	//是否主角
	IsMain bool `bson:"ismain"`
	//英雄排序
	Sort int `bson:"sort"`
	//角色id
	RoleId int `bson:"roleid"`
	//经验值
	Exp int `bson:"exp"`
	//英雄等级
	Level int `bson:"level"`
	//觉醒等级
	AwakenLevel int `bson:"awakenlevel"`
	//武具
	Equip int `bson:"equip"`
	//武具升级概率
	EquipUpgradeRate int
	//武具等级
	EquipLevel int `bson:"equiplevel"`
}

//升级觉醒
func (hero *Hero) UpgradeAwaken() {}

//升级武具，到达某一个级别，开启宝具
func (hero *Hero) UpgradeEquip() {}

//升级
func (hero *Hero) Upgrade() {}

//战力
func (hero *Hero) Combat() {}
