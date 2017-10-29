import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pot } from './pot.model';
import { PotPopupService } from './pot-popup.service';
import { PotService } from './pot.service';

@Component({
    selector: 'jhi-pot-delete-dialog',
    templateUrl: './pot-delete-dialog.component.html'
})
export class PotDeleteDialogComponent {

    pot: Pot;

    constructor(
        private potService: PotService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.potService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'potListModification',
                content: 'Deleted an pot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pot-delete-popup',
    template: ''
})
export class PotDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private potPopupService: PotPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.potPopupService
                .open(PotDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
