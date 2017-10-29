import { BaseEntity } from './../../shared';

export class Proces implements BaseEntity {
    constructor(
        public id?: number,
        public dataInici?: any,
        public estat?: boolean,
    ) {
        this.estat = false;
    }
}
