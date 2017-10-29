import { BaseEntity } from './../../shared';

export class UsuarisProces implements BaseEntity {
    constructor(
        public id?: number,
        public diners?: number,
        public procesId?: number,
        public usuarisId?: number,
    ) {
    }
}
