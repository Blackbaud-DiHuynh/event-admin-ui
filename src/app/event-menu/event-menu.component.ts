import { Component, Input } from '@angular/core';
import { Event } from '../shared/Event';
import { SkyModalService } from '@blackbaud/skyux/dist/modules/modal';
import { EventFormModalComponent } from '../event-form-modal/event-form-modal.component';
import { EventFormModalContext } from '../event-form-modal/event-from-modal-context';

@Component({
    selector: 'event-menu',
    templateUrl: './event-menu.component.html'
})
export class EventMenuComponent {
    @Input()
    public event: Event;

    public openModal(): void {
        let context = new EventFormModalContext;
        context.event = this.event;

        let options: any = {
            providers: [{ provide: EventFormModalContext, useValue: context }]
        };
        this.modal.open(EventFormModalComponent, options);
    }
    constructor(private modal: SkyModalService) {}
}
