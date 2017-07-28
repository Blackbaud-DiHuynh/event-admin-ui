import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EventFormModalComponent } from './event-form-modal/event-form-modal.component';
import { EventService } from './shared/EventService';
import { EventSubmissionService } from './shared/EventSubmissionService';
import { SkyModule } from '@blackbaud/skyux/dist/core';
import { DynamicRuleService } from './shared/DynamicRuleService';
import { EventReadOnlyModalComponent } from './event-read-only-modal/event-read-only-modal.component';

// Specify entry components, module-level providers, etc. here.
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        SkyModule
    ],
    providers: [
        EventService,
        EventSubmissionService,
        DynamicRuleService
    ],
    entryComponents: [
        EventFormModalComponent,
        EventReadOnlyModalComponent
    ]
})
export class AppExtrasModule { }
