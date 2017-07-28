import { Component, OnInit } from '@angular/core';
import { SkyModalInstance } from '@blackbaud/skyux/dist/modules/modal';
import { Event } from '../shared/Event';
import { EventService } from '../shared/EventService';
import { EventSubmissionService } from '../shared/EventSubmissionService';
import { Operation } from '../shared/operation';
import { EventFormModalContext } from './event-from-modal-context';
import { DynamicRule } from '../shared/DynamicRule';
import { DynamicRuleService } from '../shared/DynamicRuleService';

@Component({
    selector: 'event-form-modal',
    templateUrl: './event-form-modal.component.html',
    styleUrls: ['./event-form-modal.component.scss']
})
export class EventFormModalComponent implements OnInit {
    public event: Event;
    public operation: Operation;
    public format12 = 'hh';
    public price: number;
    public selectedTime;
    public dynamicTriggers: DynamicRule[] = [];

    constructor(public modalInstance: SkyModalInstance,
                private eventService: EventService,
                private eventSubmissionService: EventSubmissionService,
                private dynamicRuleService: DynamicRuleService,
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
        this.setTime();
        if (this.operation === Operation.CREATE) {
            this.event.tickets[0].capacity = this.event.capacity;
            this.eventService.createEvent(this.event).subscribe(
                savedEvent => {
                    if (savedEvent.id !== -1) {
                        this.event = savedEvent;
                        this.eventSubmissionService.success(Operation.CREATE);
                        this.modalInstance.save();
                    } else {
                        this.eventSubmissionService.failure(Operation.CREATE);
                    }
                    this.processDynamicTrigger();
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

    public addDynamicTrigger(): void {
        this.dynamicTriggers.push(new DynamicRule());
    }

    public removeDynamicTrigger(): void {
        this.dynamicTriggers.pop();
    }

    private processDynamicTrigger(): void {
        if (this.dynamicTriggers.length !== 0) {
            for (let i = 0; i < this.dynamicTriggers.length; i++) {
                this.dynamicTriggers[i].ticketId = this.event.tickets[0].id;
                this.dynamicTriggers[i].inventoryThreshold = this.event.tickets[0].capacity - (this.event.tickets[0].capacity * (this.dynamicTriggers[i].percentSoldThreshold / 100));
                this.dynamicRuleService.createDynamicRule(this.dynamicTriggers[i]).subscribe();
            }
        }
    }

    private setTime(): void {
        this.event.date.setHours(this.selectedTime.hour);
        this.event.date.setMinutes(this.selectedTime.minute);
    }
}
