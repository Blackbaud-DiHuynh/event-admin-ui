import { Component, OnInit } from '@angular/core';
import { SkyModalInstance } from '@blackbaud/skyux/dist/modules/modal';
import { Event } from '../shared/Event';

@Component({
    selector: 'event-form-modal',
    templateUrl: './event-form-modal.component.html'
})
export class EventFormModalComponent implements OnInit {
    public event: Event;
    public format12 = 'hh';
    public price: number;
    public selectedTime;

    constructor(public modalInstance: SkyModalInstance){ }

    public ngOnInit(): void {
        this.event = new Event;
    }

    public save(): void {
        this.setTime();
    //    Call service here
    }

    private setTime(): void {
        this.event.time.setHours(this.selectedTime.hour);
        this.event.time.setMinutes(this.selectedTime.minute);
    }
}