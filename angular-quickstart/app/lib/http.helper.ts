import {Http, RequestOptions, RequestMethod, Headers, Request, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

function extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
        throw new Error('Bad response status:' + res.status);
    }
    let body = res.json();
    return body.data || {}
}

function handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

export function getRequest(http: Http, url: string, options: any, f: (data) => void) {
    debugger
    http.get(url, options)
        .map(extractData)
        .subscribe(data => {
            f(data);
        });
}

export function postRequest(http: Http, url, data) {
    let headers = new Headers();
    headers.append("Content-Type", 'application/x-www-form-urlencoded');
    let body = "data=" + JSON.stringify(data);
    let requestoptions = new RequestOptions({
        method: RequestMethod.Post,
        url: url,
        headers: headers,
        body: body
    });

    return http.request(new Request(requestoptions))
        .map(res => res.json());
}