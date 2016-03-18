import {Component,OnInit} from 'angular2/core'
import {UserService} from './user.service'
import {UserConf, User} from './user.model'
import {UserDetailComponent} from './user-detail.component'

UserConf.directives=[UserDetailComponent];
UserConf.providers=[UserService];

@Component(UserConf)
export class UserComponent implements OnInit {
    public title: string = 'Tour of Heros';
    public selectedHero: User;
    public list:User[];
    constructor(private _userService:UserService){}
    onSelect(hero:User){
        this.selectedHero=hero;
    }
    getHeros(){
        this.list=this._userService.getHeros();
    }
    ngOnInit(){
        this.getHeros()
    }
}