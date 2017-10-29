import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Usuaris } from './usuaris.model';
import { UsuarisPopupService } from './usuaris-popup.service';
import { UsuarisService } from './usuaris.service';

@Component({
    selector: 'jhi-usuaris-dialog',
    templateUrl: './usuaris-dialog.component.html'
})
export class UsuarisDialogComponent implements OnInit {

    usuaris: Usuaris;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private usuarisService: UsuarisService,
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
        if (this.usuaris.id !== undefined) {
            this.subscribeToSaveResponse(
                this.usuarisService.update(this.usuaris));
        } else {
            this.subscribeToSaveResponse(
                this.usuarisService.create(this.usuaris));
        }
    }

    private subscribeToSaveResponse(result: Observable<Usuaris>) {
        result.subscribe((res: Usuaris) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Usuaris) {
        this.eventManager.broadcast({ name: 'usuarisListModification', content: 'OK'});
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
    selector: 'jhi-usuaris-popup',
    template: ''
})
export class UsuarisPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarisPopupService: UsuarisPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.usuarisPopupService
                    .open(UsuarisDialogComponent as Component, params['id']);
            } else {
                this.usuarisPopupService
                    .open(UsuarisDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
