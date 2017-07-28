import { Component, OnInit } from '@angular/core';
import { SkyModalInstance } from '@blackbaud/skyux/dist/modules/modal';
import { Event } from '../shared/Event';
import { Operation } from '../shared/operation';
import { EventReadOnlyModalContext } from './event-read-only-modal-context';
import { DynamicRule } from '../shared/DynamicRule';
import { DynamicRuleService } from '../shared/DynamicRuleService';

@Component({
    selector: 'event-read-only-modal',
    templateUrl: './event-read-only-modal.component.html'
})
export class EventReadOnlyModalComponent implements OnInit {
    public event: Event;
    public dynamicRules: DynamicRule[] = [new DynamicRule()];
    public operation: Operation;
    public format12 = 'hh';
    public price: number;
    public selectedTime;

    constructor(public modalInstance: SkyModalInstance,
                public context: EventReadOnlyModalContext,
                private service: DynamicRuleService){ }

    public ngOnInit(): void {
        this.dynamicRules[0].priceChange=0;
        this.event = this.context.event;
        this.service.getDynamicRules(this.event.tickets[0]).subscribe(
            returnedRules => {
                this.dynamicRules = returnedRules;
                for (let i = 0; i < this.dynamicRules.length; i++) {
                    this.dynamicRules[i].percentSoldThreshold = 100 + ((-100 * this.dynamicRules[i].inventoryThreshold)/this.event.tickets[0].capacity);
                }
                this.dynamicRules.sort(function(a, b) {
                    return a.percentSoldThreshold - b.percentSoldThreshold;
                })
            }
        );
    }
}