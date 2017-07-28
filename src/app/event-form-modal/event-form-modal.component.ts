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
    templateUrl: './event-form-modal.component.html'
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
        console.log(`We have ${this.dynamicTriggers.length} triggers`);
        this.dynamicTriggers = this.dynamicTriggers.concat(new DynamicRule());
    }

    private processDynamicTrigger(): void {
        if (this.dynamicTriggers.length !== 0) {
            this.dynamicTriggers[0].ticketId = this.event.tickets[0].id;
            this.dynamicTriggers[0].inventoryThreshold = this.event.tickets[0].capacity - (this.event.tickets[0].capacity * (this.dynamicTriggers[0].percentSoldThreshold / 100));
            this.dynamicRuleService.createDynamicRule(this.dynamicTriggers[0]).subscribe();

        }
    }

    private setTime(): void {
        this.event.date.setHours(this.selectedTime.hour);
        this.event.date.setMinutes(this.selectedTime.minute);
    }
}
