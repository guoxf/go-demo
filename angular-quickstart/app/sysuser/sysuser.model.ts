import {BaseModel} from '../lib/base.model'
export interface SysUser extends BaseModel {
    Uid: number;
    Nickname: string;
    Sex: number;
    Birthday: string;
    Qq: string;
    Login: number;
    RegIp: number;
    RegTime: number;
    LastLoginIp: number;
    LastLoginTime: number;
    Status: number;
    LastLoginRole: number;
    ShowRole: number;
    Signature: string;
    PosProvince: number;
    PosCity: number;
    PosDistrict: number;
    PosCommunity: number;
    Score1: number;
    Score2: number;
    Score3: number;
    Score4: number;
    ConCheck: number;
    TotalCheck: number;
}

export function copySysUser(src: SysUser) {
    var dst = {};
    dst.Uid = src.Uid;
    dst.Nickname = src.Nickname;
    dst.Sex = src.Sex;
    dst.Birthday = src.Birthday;
    dst.Qq = src.Qq;
    dst.Login = src.Login;
    dst.RegIp = src.RegIp;
    dst.RegTime = src.RegTime;
    dst.LastLoginIp = src.LastLoginIp;
    dst.LastLoginTime = src.LastLoginTime;
    dst.Status = src.Status;
    dst.LastLoginRole = src.LastLoginRole;
    dst.ShowRole = src.ShowRole;
    dst.Signature = src.Signature;
    dst.PosProvince = src.PosProvince;
    dst.PosCity = src.PosCity;
    dst.PosDistrict = src.PosDistrict;
    dst.PosCommunity = src.PosCommunity;
    dst.Score1 = src.Score1;
    dst.Score2 = src.Score2;
    dst.Score3 = src.Score3;
    dst.Score4 = src.Score4;
    dst.ConCheck = src.ConCheck;
    dst.TotalCheck = src.TotalCheck;
    return dst;
}
export function copySysUser2(src: SysUser, dst: SysUser) {
    if (src === undefined || dst === undefined) { return; }
    dst.Uid = src.Uid;
    dst.Nickname = src.Nickname;
    dst.Sex = src.Sex;
    dst.Birthday = src.Birthday;
    dst.Qq = src.Qq;
    dst.Login = src.Login;
    dst.RegIp = src.RegIp;
    dst.RegTime = src.RegTime;
    dst.LastLoginIp = src.LastLoginIp;
    dst.LastLoginTime = src.LastLoginTime;
    dst.Status = src.Status;
    dst.LastLoginRole = src.LastLoginRole;
    dst.ShowRole = src.ShowRole;
    dst.Signature = src.Signature;
    dst.PosProvince = src.PosProvince;
    dst.PosCity = src.PosCity;
    dst.PosDistrict = src.PosDistrict;
    dst.PosCommunity = src.PosCommunity;
    dst.Score1 = src.Score1;
    dst.Score2 = src.Score2;
    dst.Score3 = src.Score3;
    dst.Score4 = src.Score4;
    dst.ConCheck = src.ConCheck;
    dst.TotalCheck = src.TotalCheck;
    return dst;
}

export function newDefaultSysUser() {
    return {};
}
