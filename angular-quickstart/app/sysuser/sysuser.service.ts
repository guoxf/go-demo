import {Injectable} from 'angular2/core'
import {SysUser} from './sysuser.model'
import {Http} from 'angular2/http'
import {BaseService} from '../lib/base.service'

@Injectable()
export class SysUserService extends BaseService<SysUser> {
    constructor(http:Http) {
        super(http);
        this.url="http://localhost:8080/v1/sysuser/";
    }
}
