import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { UsuarisProces } from './usuaris-proces.model';
import { UsuarisProcesService } from './usuaris-proces.service';

@Component({
    selector: 'jhi-usuaris-proces-detail',
    templateUrl: './usuaris-proces-detail.component.html'
})
export class UsuarisProcesDetailComponent implements OnInit, OnDestroy {

    usuarisProces: UsuarisProces;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private usuarisProcesService: UsuarisProcesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUsuarisProces();
    }

    load(id) {
        this.usuarisProcesService.find(id).subscribe((usuarisProces) => {
            this.usuarisProces = usuarisProces;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUsuarisProces() {
        this.eventSubscriber = this.eventManager.subscribe(
            'usuarisProcesListModification',
            (response) => this.load(this.usuarisProces.id)
        );
    }
}
