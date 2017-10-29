import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Proces } from './proces.model';
import { ProcesPopupService } from './proces-popup.service';
import { ProcesService } from './proces.service';

@Component({
    selector: 'jhi-proces-delete-dialog',
    templateUrl: './proces-delete-dialog.component.html'
})
export class ProcesDeleteDialogComponent {

    proces: Proces;

    constructor(
        private procesService: ProcesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.procesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'procesListModification',
                content: 'Deleted an proces'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-proces-delete-popup',
    template: ''
})
export class ProcesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private procesPopupService: ProcesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.procesPopupService
                .open(ProcesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
