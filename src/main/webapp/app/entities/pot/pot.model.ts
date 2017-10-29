import { BaseEntity } from './../../shared';

export class Pot implements BaseEntity {
    constructor(
        public id?: number,
        public dinersTotals?: number,
        public data?: any,
        public descripcio?: string,
    ) {
    }
}
