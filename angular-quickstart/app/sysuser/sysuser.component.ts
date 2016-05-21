
import {Component, OnInit} from '@angular/core'
import {SysUserService} from './sysuser.service'
import {SysUser} from './sysuser.model'
import {SysUserDetailComponent} from './sysuser-detail.component'
import {Router} from '@angular/router-deprecated'
import {templateRoot} from '../lib/common'
@Component({
    selector: 'sysuser-list',
    directives: [SysUserDetailComponent],
    providers: [],
    templateUrl: templateRoot+'app/sysuser/sysuser.component.html'
})
export class SysUserComponent implements OnInit {
    public selected: SysUser;
    public list: SysUser[];
    public queryParams={};
    
    constructor(private _router: Router,
        private _service: SysUserService) { }
    onSelect(m: SysUser) {
        this.selected = m;
    }
    getAll() {
        this._service.getAll().then(list => this.list = list);
    }
    ngOnInit() {
        this.getAll()
    }

    gotoDetail(action:string, m: SysUser) {
        if(action=="update"){
            this.selected = m;
            this._router.navigate(['SysUserDetail', { id: this.selected.Uid,action:action }]);
        }else{
            this._router.navigate(['SysUserDetail', { id: 0,action:action }]);
        }
    }
    
    selectAll(event){
        this._service.selectAll(event.currentTarget.checked);
    }
    enable(m: SysUser) {
        this._service.changeStatus(m, 1);
    }

    disable(m: SysUser) {
        this._service.changeStatus(m, 0);
    }
    
    del(m: SysUser) {
        this._service.del(m);
    }
}