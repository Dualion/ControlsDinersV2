import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Proces } from './proces.model';
import { ProcesService } from './proces.service';

@Component({
    selector: 'jhi-proces-detail',
    templateUrl: './proces-detail.component.html'
})
export class ProcesDetailComponent implements OnInit, OnDestroy {

    proces: Proces;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private procesService: ProcesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProces();
    }

    load(id) {
        this.procesService.find(id).subscribe((proces) => {
            this.proces = proces;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProces() {
        this.eventSubscriber = this.eventManager.subscribe(
            'procesListModification',
            (response) => this.load(this.proces.id)
        );
    }
}
