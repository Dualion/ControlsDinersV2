import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pot } from './pot.model';
import { PotPopupService } from './pot-popup.service';
import { PotService } from './pot.service';

@Component({
    selector: 'jhi-pot-dialog',
    templateUrl: './pot-dialog.component.html'
})
export class PotDialogComponent implements OnInit {

    pot: Pot;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private potService: PotService,
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
        if (this.pot.id !== undefined) {
            this.subscribeToSaveResponse(
                this.potService.update(this.pot));
        } else {
            this.subscribeToSaveResponse(
                this.potService.create(this.pot));
        }
    }

    private subscribeToSaveResponse(result: Observable<Pot>) {
        result.subscribe((res: Pot) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Pot) {
        this.eventManager.broadcast({ name: 'potListModification', content: 'OK'});
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
    selector: 'jhi-pot-popup',
    template: ''
})
export class PotPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private potPopupService: PotPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.potPopupService
                    .open(PotDialogComponent as Component, params['id']);
            } else {
                this.potPopupService
                    .open(PotDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
