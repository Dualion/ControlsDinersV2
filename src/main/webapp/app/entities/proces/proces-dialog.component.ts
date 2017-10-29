import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Proces } from './proces.model';
import { ProcesPopupService } from './proces-popup.service';
import { ProcesService } from './proces.service';

@Component({
    selector: 'jhi-proces-dialog',
    templateUrl: './proces-dialog.component.html'
})
export class ProcesDialogComponent implements OnInit {

    proces: Proces;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private procesService: ProcesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.proces.id !== undefined) {
            this.subscribeToSaveResponse(
                this.procesService.update(this.proces));
        } else {
            this.subscribeToSaveResponse(
                this.procesService.create(this.proces));
        }
    }

    private subscribeToSaveResponse(result: Observable<Proces>) {
        result.subscribe((res: Proces) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Proces) {
        this.eventManager.broadcast({ name: 'procesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-proces-popup',
    template: ''
})
export class ProcesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private procesPopupService: ProcesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.procesPopupService
                    .open(ProcesDialogComponent as Component, params['id']);
            } else {
                this.procesPopupService
                    .open(ProcesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
