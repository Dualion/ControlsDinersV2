import { BaseEntity } from './../../shared';

export class Usuaris implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public email?: string,
        public dataInici?: any,
        public actiu?: boolean,
    ) {
        this.actiu = false;
    }
}
