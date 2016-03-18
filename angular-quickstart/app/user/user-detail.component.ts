import {Component} from 'angular2/core'

import {UserDetailConf, User} from './user.model'

@Component(UserDetailConf)
export class UserDetailComponent {
    public hero: User;
}