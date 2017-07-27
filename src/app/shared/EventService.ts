import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Event } from './Event';

@Injectable()
export class EventService {
    private serviceUrl = 'https://local.docker:4243/events';
    constructor(private http: Http) {
    }

    public getAllEvents(): Observable<Event[]> {
        let headers = new Headers({'Accept': 'application/json'});
        return this.http
            .get(this.serviceUrl, { headers })
            .map((res: Response) => res.json())
            .catch((error) => {
            return Observable.throw(error);
        });
    }

    public createEvent(event: Event): Observable<Event> {
        let headers = new Headers({'Accept': 'application/json'});
        return this.http
            .post(this.serviceUrl, event, { headers })
            .map((res: Response) => res.json())
            .catch((error) => {
                return Observable.throw(error);
        });
    }

    public updateEvent(event: Event): Observable<Event> {
        let headers = new Headers({'Accept': 'application/json'});
        return this.http
            .put(this.serviceUrl + '/' + event.id, event, { headers })
            .map((res: Response) => res.json())
            .catch((error) => {
                return Observable.throw(error);
        });
    }
}
