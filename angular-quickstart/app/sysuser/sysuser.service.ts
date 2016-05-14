import {Injectable} from '@angular/core'
import {SysUser} from './sysuser.model'
import {Http} from '@angular/http'
import {BaseService} from '../lib/base.service'
import {urlRoot} from '../lib/common'

@Injectable()
export class SysUserService extends BaseService<SysUser> {
    constructor(http:Http) {
        super(http);
        this.url=urlRoot+"sysuser/";
    }
}
