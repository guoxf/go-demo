import {Component} from '@angular/core';
import {SysUserComponent} from './sysuser/sysuser.component'
import {SysUserDetailComponent} from './sysuser/sysuser-detail.component'
import {DashboardComponent} from './dashboard.component'
import {SysUserService} from './sysuser/sysuser.service'
import {HTTP_PROVIDERS} from '@angular/http'
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated'
import {templateRoot} from './lib/common'
@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <nav>
    <a [routerLink]="['Dashboard']">Dashboard</a>
    <a [routerLink]="['Heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
    `,
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [
        ROUTER_PROVIDERS,
        SysUserService,
        HTTP_PROVIDERS
    ],
    styleUrls:[templateRoot+'app/app.component.css']
})
@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/detail/:id/:action',
        name: 'SysUserDetail',
        component: SysUserDetailComponent
    },
    {
        path: '/heroes',
        name: 'Heroes',
        component: SysUserComponent
    }
])
export class AppComponent {
    title = 'Tour of Heroes'
}