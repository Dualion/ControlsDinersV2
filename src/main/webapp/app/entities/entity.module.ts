import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ControlDinersPotModule } from './pot/pot.module';
import { ControlDinersProcesModule } from './proces/proces.module';
import { ControlDinersQuantitatModule } from './quantitat/quantitat.module';
import { ControlDinersUsuarisModule } from './usuaris/usuaris.module';
import { ControlDinersUsuarisProcesModule } from './usuaris-proces/usuaris-proces.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ControlDinersPotModule,
        ControlDinersProcesModule,
        ControlDinersQuantitatModule,
        ControlDinersUsuarisModule,
        ControlDinersUsuarisProcesModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlDinersEntityModule {}
