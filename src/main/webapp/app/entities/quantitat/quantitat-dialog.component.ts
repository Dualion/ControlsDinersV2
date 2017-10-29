import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Quantitat } from './quantitat.model';
import { QuantitatPopupService } from './quantitat-popup.service';
import { QuantitatService } from './quantitat.service';

@Component({
    selector: 'jhi-quantitat-dialog',
    templateUrl: './quantitat-dialog.component.html'
})
export class QuantitatDialogComponent implements OnInit {

    quantitat: Quantitat;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private quantitatService: QuantitatService,
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
        if (this.quantitat.id !== undefined) {
            this.subscribeToSaveResponse(
                this.quantitatService.update(this.quantitat));
        } else {
            this.subscribeToSaveResponse(
                this.quantitatService.create(this.quantitat));
        }
    }

    private subscribeToSaveResponse(result: Observable<Quantitat>) {
        result.subscribe((res: Quantitat) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Quantitat) {
        this.eventManager.broadcast({ name: 'quantitatListModification', content: 'OK'});
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
    selector: 'jhi-quantitat-popup',
    template: ''
})
export class QuantitatPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quantitatPopupService: QuantitatPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.quantitatPopupService
                    .open(QuantitatDialogComponent as Component, params['id']);
            } else {
                this.quantitatPopupService
                    .open(QuantitatDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
