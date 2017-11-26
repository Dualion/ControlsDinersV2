import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlDinersSharedModule } from '../../shared';
import {
    QuantitatService,
    QuantitatPopupService,
    QuantitatComponent,
    QuantitatDetailComponent,
    quantitatRoute,
    QuantitatResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...quantitatRoute,
];

@NgModule({
    imports: [
        ControlDinersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        QuantitatComponent,
        QuantitatDetailComponent,
    ],
    entryComponents: [
        QuantitatComponent,
    ],
    providers: [
        QuantitatService,
        QuantitatPopupService,
        QuantitatResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlDinersQuantitatModule {}
