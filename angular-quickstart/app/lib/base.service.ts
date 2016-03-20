import {Injectable} from 'angular2/core'
import {Http, Headers, RequestOptions, RequestMethod, Request, Response} from 'angular2/http'
import 'rxjs/add/operator/map';
import {getRequest, postRequest} from './http.helper'
import {BaseModel} from './base.model'

export class BaseService<T extends BaseModel>{
    public list: T[] = [];
    public url: string;

    constructor(public _http: Http) { }

    query(force: boolean, f: () => void) {
        if (force || this.list.length == 0) {
            getRequest(this._http, this.url + "GetAll", null, (data) => {
                if (data.Success) {
                    this.list = data.data;
                    f();
                } else {
                    alert(data.ErrorMsg);
                }
            });
        } else {
            f();
        }
    }

    getAll() {
        return new Promise<T[]>(resolve => {
            this.query(false, () => {
                resolve(this.list);
            });
        });
    }

    getFromRemote(id: number) {
        return new Promise<T>(resolve => {
            getRequest(this._http, this.url + id, null, (data) => {
                console.log(data);
                if (data.Success) {
                    resolve(data.ErrorMsg);
                }
            });
        });
    }
    get(f: (m: T) => boolean) {
        return Promise.resolve(this.list).then(
            l => l.filter(f)[0]
        )
    }

    add(m: T) {
        postRequest(this._http, this.url + "Add", m)
            .subscribe(data => {
                if (data.Success) {
                    Promise.resolve(this.list).then(
                        l => {
                            l.push(m);
                        }
                    );
                } else {
                    alert(data.ErrorMsg);
                }
            });
    }
    update(t: T, f: (l) => void) {
        postRequest(this._http, this.url + "Update", t)
            .subscribe(data => {
                if (data.Success) {
                    Promise.resolve(this.list).then(f);
                } else {
                    alert(data.ErrorMsg);
                }
            });
    }

    del(m: T) {
        postRequest(this._http, this.url + "Del", m)
            .subscribe(data => {
                console.log(data);
            });
    }

    selectAll(selected: boolean) {
        this.list.forEach(t => t.Selected = selected);
    }

    changeStatus(t: T, newStatus: number) {
        let oldStatus = t.Status;
        t.Status = newStatus;
        postRequest(this._http, this.url + "Update", t)
            .subscribe(data => {
                if (data.Success === false) {
                    alert(data.ErrorMsg);
                    t.Status = oldStatus;
                }
            });
    }
}