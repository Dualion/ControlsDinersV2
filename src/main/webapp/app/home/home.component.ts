import { Pagament } from '../entities/pot/pagament.model';
import { Pot } from '../entities/pot/pot.model';
import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal, ResponseWrapper } from '../shared';

import { PotService } from '../entities/pot/pot.service';
import { ProcesService } from '../entities/proces';
import { Proces } from '../entities/proces/proces.model';
import { QuantitatService } from '../entities/quantitat';
import { Quantitat } from '../entities/quantitat/quantitat.model';
import { UsuarisProcesService } from '../entities/usuaris-proces';
import { UsuarisProces } from '../entities/usuaris-proces/usuaris-proces.model';
import { ExtreureDinersModalService } from './extreure-diners/extreure-diners-modal.service';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRefLogin: NgbModalRef;
    modalRefExtreure: NgbModalRef;

    lastPot: number;
    procesIsActive: boolean;
    quantitatActiva: number;
    usuarisProces: Array<UsuarisProces>;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private extreureDinersModalService: ExtreureDinersModalService,
        private eventManager: JhiEventManager,
        private potService: PotService,
        private procesService: ProcesService,
        private quantitatService: QuantitatService,
        private usuarisProcesService: UsuarisProcesService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.getLast();
        this.getProcesIsActive();
        this.getQuantitatActiva();
        this.getUsuarisProces();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRefLogin = this.loginModalService.open();
    }

    getLast() {
        this.potService.getLast().subscribe(
            (res: Pot) => this.lastPot = res.dinersTotals,
            (res: Pot) => this.lastPot = 0
        );
    }

    getProcesIsActive() {
        this.procesService.getProcesIsActive().subscribe(
            (res: boolean) => this.procesIsActive = res,
            (res: boolean) => this.procesIsActive = null
        );
    }

    getQuantitatActiva() {
        this.quantitatService.getActiva().subscribe(
            (res: Quantitat) => this.quantitatActiva = res.diners,
            (res: Quantitat) => this.quantitatActiva = 0
        );
    }

    getUsuarisProces() {
        this.usuarisProcesService.getActiu().subscribe(
            (res: ResponseWrapper) => this.usuarisProces = res.json,
            (res: ResponseWrapper) => this.usuarisProces = null
        );
    }

    pagar(userId: number) {
        const pagament = new Pagament(userId);
        this.potService.pagament(pagament).subscribe(
            (res: Pot) => {
                this.getUsuarisProces();
                this.getLast();
            }
        );
    }

    cancelarPagament(userId: number) {
        const pagament = new Pagament(userId);
        this.potService.cancelarPagament(pagament).subscribe(
            (res: Pot) => {
                this.getUsuarisProces();
                this.getLast();
            }
        );
    }

    crearProces() {
        this.procesService.createProces().subscribe(
            (res: Proces) => {
                this.procesIsActive = true;
                this.getUsuarisProces();
            },
            (res: Proces) => {
                this.procesIsActive = false;
            }
        );
    }

    acabarProces() {
        this.procesService.acabarProces().subscribe(
            (res: Proces) => {
                this.procesIsActive = false;
                this.getUsuarisProces();
            },
            (res: Proces) => {
                this.procesIsActive = true;
            }
        );
    }

    extreurePot() {
        this.modalRefExtreure = this.extreureDinersModalService.open();
        this.modalRefExtreure.result.then((result) => {
            this.lastPot = result.dinersTotals;
        });
    }

    quantitatNova() {
        alert('quantitat nova');
    }
}
