import {Injectable} from 'angular2/core'
import {HEROS} from './mock-users'
@Injectable()
export class UserService{
    getHeros(){
        return HEROS;
    }
}