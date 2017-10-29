import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UsuarisProces } from './usuaris-proces.model';
import { UsuarisProcesPopupService } from './usuaris-proces-popup.service';
import { UsuarisProcesService } from './usuaris-proces.service';
import { Proces, ProcesService } from '../proces';
import { Usuaris, UsuarisService } from '../usuaris';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-usuaris-proces-dialog',
    templateUrl: './usuaris-proces-dialog.component.html'
})
export class UsuarisProcesDialogComponent implements OnInit {

    usuarisProces: UsuarisProces;
    isSaving: boolean;

    proces: Proces[];

    usuarises: Usuaris[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private usuarisProcesService: UsuarisProcesService,
        private procesService: ProcesService,
        private usuarisService: UsuarisService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.procesService.query()
            .subscribe((res: ResponseWrapper) => { this.proces = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.usuarisService.query()
            .subscribe((res: ResponseWrapper) => { this.usuarises = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.usuarisProces.id !== undefined) {
            this.subscribeToSaveResponse(
                this.usuarisProcesService.update(this.usuarisProces));
        } else {
            this.subscribeToSaveResponse(
                this.usuarisProcesService.create(this.usuarisProces));
        }
    }

    private subscribeToSaveResponse(result: Observable<UsuarisProces>) {
        result.subscribe((res: UsuarisProces) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: UsuarisProces) {
        this.eventManager.broadcast({ name: 'usuarisProcesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProcesById(index: number, item: Proces) {
        return item.id;
    }

    trackUsuarisById(index: number, item: Usuaris) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-usuaris-proces-popup',
    template: ''
})
export class UsuarisProcesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarisProcesPopupService: UsuarisProcesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.usuarisProcesPopupService
                    .open(UsuarisProcesDialogComponent as Component, params['id']);
            } else {
                this.usuarisProcesPopupService
                    .open(UsuarisProcesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
