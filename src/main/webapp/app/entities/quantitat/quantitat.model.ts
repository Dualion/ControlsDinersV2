import { BaseEntity } from './../../shared';

export class Quantitat implements BaseEntity {
    constructor(
        public id?: number,
        public diners?: number,
        public actiu?: boolean,
    ) {
        this.actiu = false;
    }
}
