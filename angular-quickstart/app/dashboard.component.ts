import { Component, OnInit } from '@angular/core';

import { SysUser } from './sysuser/sysuser.model';
import { SysUserService } from './sysuser/sysuser.service';
import { Router } from '@angular/router-deprecated'
import {templateRoot} from './lib/common'

@Component({
    selector: 'my-dashboard',
    templateUrl: templateRoot+'app/dashboard.component.html',
    styleUrls: [templateRoot+'app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    heroes: SysUser[] = [];
    constructor(private _router: Router, private _userService: SysUserService) { }
    ngOnInit() {
        this._userService.getAll()
            .then(heroes => this.heroes = heroes.slice(0, 5));
    }
    gotoDetail(hero: SysUser) {
        let link = ['SysUserDetail', { id: hero.Uid,action:"update" }];
        this._router.navigate(link);
    }
}
