import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlDinersSharedModule } from '../shared';
import { ControlDinersEntityModule } from '../entities/entity.module';

import { HOME_ROUTE, HomeComponent } from './';

@NgModule({
    imports: [
        ControlDinersSharedModule,
        ControlDinersEntityModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true })
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlDinersHomeModule {}
