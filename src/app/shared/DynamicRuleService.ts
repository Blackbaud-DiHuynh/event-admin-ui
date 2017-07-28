import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DynamicRule } from './DynamicRule';

@Injectable()
export class DynamicRuleService {
    private serviceUrl = 'https://local.docker:4243/dynamicRules';
    constructor(private http: Http) {
    }

    public createDynamicRule(dynamicRule: DynamicRule): Observable<DynamicRule> {
        let headers = new Headers({'Accept': 'application/json'});
        return this.http
            .post(this.serviceUrl, dynamicRule, { headers })
            .map((res: Response) => res.json())
            .catch((error) => {
                return Observable.throw(error);
            });
    }
}
