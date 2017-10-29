import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Usuaris } from './usuaris.model';
import { UsuarisPopupService } from './usuaris-popup.service';
import { UsuarisService } from './usuaris.service';

@Component({
    selector: 'jhi-usuaris-delete-dialog',
    templateUrl: './usuaris-delete-dialog.component.html'
})
export class UsuarisDeleteDialogComponent {

    usuaris: Usuaris;

    constructor(
        private usuarisService: UsuarisService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.usuarisService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'usuarisListModification',
                content: 'Deleted an usuaris'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-usuaris-delete-popup',
    template: ''
})
export class UsuarisDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarisPopupService: UsuarisPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.usuarisPopupService
                .open(UsuarisDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
