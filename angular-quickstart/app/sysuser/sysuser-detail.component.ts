
import {Component, OnInit} from 'angular2/core'
import {RouteParams} from 'angular2/router'
import {SysUser, copySysUser, copySysUser2,newDefaultSysUser} from './sysuser.model'
import {SysUserService} from './sysuser.service'

@Component({
    selector: 'sysuser-detail',
    templateUrl: 'app/sysuser/sysuser-detail.component.html'
})
export class SysUserDetailComponent implements OnInit {
    public newModel: SysUser;
    private oldModel: SysUser;
    private action: string;

    constructor(
        private _service: SysUserService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this.action = this._routeParams.get('action');
        if (this.action === "update") {
            let id = +this._routeParams.get('id');
            this._service.get(m => m.Uid === id).then(m => {
                this.oldModel = m;
                this.newModel = copySysUser(this.oldModel);
            });
        }else{
            this.newModel=newDefaultSysUser();
        }
    }

    goBack() {
        window.history.back();
    }

    save() {
        if (this.action === "update") {
            this._service.update(this.newModel, l => {
                var old = l.filter(m => m.Uid === this.newModel.Uid)[0];
                copySysUser2(this.newModel,old);
            });
        }else if(this.action === "add"){
            this._service.add(this.newModel);
        }
        this.goBack();
    }
}