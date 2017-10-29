import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlDinersSharedModule } from '../../shared';
import {
    PotService,
    PotPopupService,
    PotComponent,
    PotDetailComponent,
    PotDialogComponent,
    PotPopupComponent,
    PotDeletePopupComponent,
    PotDeleteDialogComponent,
    potRoute,
    potPopupRoute,
    PotResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...potRoute,
    ...potPopupRoute,
];

@NgModule({
    imports: [
        ControlDinersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PotComponent,
        PotDetailComponent,
        PotDialogComponent,
        PotDeleteDialogComponent,
        PotPopupComponent,
        PotDeletePopupComponent,
    ],
    entryComponents: [
        PotComponent,
        PotDialogComponent,
        PotPopupComponent,
        PotDeleteDialogComponent,
        PotDeletePopupComponent,
    ],
    providers: [
        PotService,
        PotPopupService,
        PotResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlDinersPotModule {}
