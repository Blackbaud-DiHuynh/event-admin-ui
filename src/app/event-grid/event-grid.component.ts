import { Component, OnInit } from '@angular/core';
import { ListSortFieldSelectorModel } from '@blackbaud/skyux/dist/core';
import { Subscription } from 'rxjs';
import { EventService } from '../shared/EventService';
import { Event } from '../shared/Event';
import { EventSubmissionService } from '../shared/EventSubmissionService';

@Component({
    selector: 'event-grid',
    templateUrl: './event-grid.component.html'
})
export class EventGridComponent implements OnInit {
    public events: Event[] = [];
    private modalSubscription: Subscription;

    constructor(private eventService: EventService,
                private eventSubmissionService: EventSubmissionService) { }

    public ngOnInit(): void {
        this.getAllEvents();

        this.modalSubscription = this.eventSubmissionService.result.subscribe(
            result => {
                this.getAllEvents();
            }
        );
    }

    public sortChanged(activeSort: ListSortFieldSelectorModel) {
        let sortField = activeSort.fieldSelector;
        let descending = activeSort.descending;
        this.events = this.events.sort((a: any, b: any) => {
            let value1 = a[sortField];
            let value2 = b[sortField];

            if (value1 && typeof value1 === 'string') {
                value1 = value1.toLowerCase();
            }

            if (value2 && typeof value2 === 'string') {
                value2 = value2.toLowerCase();
            }
            if (value1 === value2) {
                return 0;
            }

            let result = value1 > value2 ? 1 : -1;

            if (descending) {
                result *= -1;
            }
            return result;
        }).slice();
    }

    private getAllEvents(): void {
        this.eventService.getAllEvents().subscribe(
            retrievedEvents => {
                this.events = retrievedEvents;
                this.mapPrices(retrievedEvents);
            },
            error => {
                console.log(error);
            }
        );
    }

    private mapPrices(retrievedEvents: Event[]): void {
        for (let i = 0; i < retrievedEvents.length; i += 1) {
            this.events[i].currentPrice = retrievedEvents[i].tickets[0].currentPrice;
            this.events[i].basePrice = retrievedEvents[i].tickets[0].basePrice;

        }
    }
}
