import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UsuarisProces } from './usuaris-proces.model';
import { UsuarisProcesPopupService } from './usuaris-proces-popup.service';
import { UsuarisProcesService } from './usuaris-proces.service';

@Component({
    selector: 'jhi-usuaris-proces-delete-dialog',
    templateUrl: './usuaris-proces-delete-dialog.component.html'
})
export class UsuarisProcesDeleteDialogComponent {

    usuarisProces: UsuarisProces;

    constructor(
        private usuarisProcesService: UsuarisProcesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.usuarisProcesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'usuarisProcesListModification',
                content: 'Deleted an usuarisProces'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-usuaris-proces-delete-popup',
    template: ''
})
export class UsuarisProcesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarisProcesPopupService: UsuarisProcesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.usuarisProcesPopupService
                .open(UsuarisProcesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
