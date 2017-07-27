import { Component, OnInit } from '@angular/core';
import { SkyModalInstance } from '@blackbaud/skyux/dist/modules/modal';

@Component({
    selector: 'event-form-modal',
    templateUrl: './event-form-modal.component.html'
})
export class EventFormModalComponent implements OnInit {
    public name: string;
    public location: string;
    public format12 = 'hh';
    public selectedTime;
    public selectedDate: Date;

    constructor(public modalInstance: SkyModalInstance){ }

    public ngOnInit(): void {
    //    create objects eventually
    }
}