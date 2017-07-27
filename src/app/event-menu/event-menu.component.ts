import { Component, Input } from '@angular/core';
import { Event } from '../shared/Event';
import { SkyModalService } from '@blackbaud/skyux/dist/modules/modal';
import { EventFormModalComponent } from '../event-form-modal/event-form-modal.component';

@Component({
    selector: 'event-menu',
    templateUrl: './event-menu.component.html'
})
export class EventMenuComponent {
    @Input()
    public event: Event;
    public openModal(): void{
        let options: any = {
            providers: [{ provide: EventFormModalComponent }]
        };
        this.modal.open(EventFormModalComponent, options);
    }
    constructor(private modal: SkyModalService) {}
}
