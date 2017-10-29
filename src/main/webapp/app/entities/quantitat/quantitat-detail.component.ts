import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Quantitat } from './quantitat.model';
import { QuantitatService } from './quantitat.service';

@Component({
    selector: 'jhi-quantitat-detail',
    templateUrl: './quantitat-detail.component.html'
})
export class QuantitatDetailComponent implements OnInit, OnDestroy {

    quantitat: Quantitat;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private quantitatService: QuantitatService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInQuantitats();
    }

    load(id) {
        this.quantitatService.find(id).subscribe((quantitat) => {
            this.quantitat = quantitat;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInQuantitats() {
        this.eventSubscriber = this.eventManager.subscribe(
            'quantitatListModification',
            (response) => this.load(this.quantitat.id)
        );
    }
}
