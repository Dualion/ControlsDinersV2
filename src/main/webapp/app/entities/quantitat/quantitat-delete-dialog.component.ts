import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Quantitat } from './quantitat.model';
import { QuantitatPopupService } from './quantitat-popup.service';
import { QuantitatService } from './quantitat.service';

@Component({
    selector: 'jhi-quantitat-delete-dialog',
    templateUrl: './quantitat-delete-dialog.component.html'
})
export class QuantitatDeleteDialogComponent {

    quantitat: Quantitat;

    constructor(
        private quantitatService: QuantitatService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.quantitatService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'quantitatListModification',
                content: 'Deleted an quantitat'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-quantitat-delete-popup',
    template: ''
})
export class QuantitatDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private quantitatPopupService: QuantitatPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.quantitatPopupService
                .open(QuantitatDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
