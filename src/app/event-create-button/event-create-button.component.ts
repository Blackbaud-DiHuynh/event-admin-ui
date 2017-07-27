import { Component } from '@angular/core';
import {SkyModalService} from '@blackbaud/skyux/dist/modules/modal';
import { EventFormModalComponent } from '../event-form-modal/event-form-modal.component';

@Component({
    selector: 'event-create-button',
    templateUrl: './event-create-button.component.html'
})
export class EventCreateButtonComponent  {

    constructor(private modal: SkyModalService) {
    }

    public openModal() {

        // let context = new MerchantAccountFormContext();
        //
        let options: any = {
            providers: [{ provide: EventFormModalComponent }]
        };

        this.modal.open(EventFormModalComponent, options);
    }
}
