import { Component, Input } from '@angular/core';
import { Event } from '../shared/Event';
import { SkyModalService } from '@blackbaud/skyux/dist/modules/modal';
import { EventReadOnlyModalContext } from '../event-read-only-modal/event-read-only-modal-context';
import { EventReadOnlyModalComponent } from '../event-read-only-modal/event-read-only-modal.component';

@Component({
    selector: 'event-menu',
    templateUrl: './event-menu.component.html'
})
export class EventMenuComponent {
    @Input()
    public event: Event;

    public openModal(): void {
        let context = new EventReadOnlyModalContext;
        context.event = this.event;

        let options: any = {
            providers: [{ provide: EventReadOnlyModalContext, useValue: context }]
        };
        this.modal.open(EventReadOnlyModalComponent, options);
    }
    constructor(private modal: SkyModalService) {}
}
