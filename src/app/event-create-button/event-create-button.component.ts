import { Component } from '@angular/core';
import {SkyModalService} from '@blackbaud/skyux/dist/modules/modal';
import { EventFormModalComponent } from '../event-form-modal/event-form-modal.component';
import { EventFormModalContext } from '../event-form-modal/event-from-modal-context';

@Component({
    selector: 'event-create-button',
    templateUrl: './event-create-button.component.html',
    styleUrls: ['./event-create-button.component.scss']
})
export class EventCreateButtonComponent  {

    constructor(private modal: SkyModalService) {
    }

    public openModal() {

        let context = new EventFormModalContext();

        let options: any = {
            providers: [{ provide: EventFormModalContext, useValue: context }]
        };

        this.modal.open(EventFormModalComponent, options);
    }
}
