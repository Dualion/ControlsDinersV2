import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Usuaris } from './usuaris.model';
import { UsuarisService } from './usuaris.service';

@Component({
    selector: 'jhi-usuaris-detail',
    templateUrl: './usuaris-detail.component.html'
})
export class UsuarisDetailComponent implements OnInit, OnDestroy {

    usuaris: Usuaris;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private usuarisService: UsuarisService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUsuarises();
    }

    load(id) {
        this.usuarisService.find(id).subscribe((usuaris) => {
            this.usuaris = usuaris;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUsuarises() {
        this.eventSubscriber = this.eventManager.subscribe(
            'usuarisListModification',
            (response) => this.load(this.usuaris.id)
        );
    }
}
