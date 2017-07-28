import { Component, OnInit } from '@angular/core';
import { SkyModalInstance } from '@blackbaud/skyux/dist/modules/modal';
import { Event } from '../shared/Event';
import { Operation } from '../shared/operation';
import { EventReadOnlyModalContext } from './event-read-only-modal-context';

@Component({
    selector: 'event-read-only-modal',
    templateUrl: './event-read-only-modal.component.html'
})
export class EventReadOnlyModalComponent implements OnInit {
    public event: Event;
    public operation: Operation;
    public format12 = 'hh';
    public price: number;
    public selectedTime;

    constructor(public modalInstance: SkyModalInstance,
                public context: EventReadOnlyModalContext){ }

    public ngOnInit(): void {
       console.log(this.context.event);
    }
}