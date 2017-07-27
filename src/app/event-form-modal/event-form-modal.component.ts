import { Component, OnInit } from '@angular/core';
import { SkyModalInstance } from '@blackbaud/skyux/dist/modules/modal';
import { Event } from '../shared/Event';
import { EventService } from '../shared/EventService';
import { EventSubmissionService } from '../shared/EventSubmissionService';
import { Operation } from '../shared/operation';
import { EventFormModalContext } from './event-from-modal-context';

@Component({
    selector: 'event-form-modal',
    templateUrl: './event-form-modal.component.html'
})
export class EventFormModalComponent implements OnInit {
    public event: Event;
    public operation: Operation;
    public format12 = 'hh';
    public price: number;
    public selectedTime;

    constructor(public modalInstance: SkyModalInstance,
                private eventService: EventService,
                private eventSubmissionService: EventSubmissionService,
                public context: EventFormModalContext){ }

    public ngOnInit(): void {
        if (this.context.event) {
            this.operation = Operation.EDIT;
            this.event = this.context.event;
            // this.selectedTime = this.event.time;
        } else {
            this.operation = Operation.CREATE;
            this.event = new Event;
        }
    }

    public save(): void {
        // console.log(this.selectedTime);
        // if (!(this.selectedTime instanceof Date)) {
        //     this.setTime();
        // }
        if (this.operation === Operation.CREATE) {
            this.eventService.createEvent(this.event).subscribe(
                savedEvent => {
                    if (savedEvent.id !== -1) {
                        this.event = savedEvent;
                        this.eventSubmissionService.success(Operation.CREATE);
                        this.modalInstance.save();
                    } else {
                        this.eventSubmissionService.failure(Operation.CREATE);
                    }
                }
            );
        } else {
            this.eventService.updateEvent(this.event).subscribe(
                updatedEvent => {
                    if (updatedEvent.id === this.event.id) {
                        this.event = updatedEvent;
                        this.eventSubmissionService.success(Operation.EDIT);
                        this.modalInstance.save();
                    } else {
                        this.eventSubmissionService.failure(Operation.EDIT);
                    }
                }
            );
        }
        this.modalInstance.save();
    }
    //
    // private setTime(): void {
    //     console.log(this.event.time);
    //     this.event.time.setHours(this.selectedTime.hour);
    //     this.event.time.setMinutes(this.selectedTime.minute);
    // }
}