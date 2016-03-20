import {Http, RequestOptions, RequestMethod, Headers, Request} from 'angular2/http';

export function getRequest(http: Http, url: string, options: any, f: (data) => void) {
    http.get(url, options)
        .map(res => res.json())
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