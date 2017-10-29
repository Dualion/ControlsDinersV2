import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Pot } from './pot.model';
import { PotService } from './pot.service';

@Component({
    selector: 'jhi-pot-detail',
    templateUrl: './pot-detail.component.html'
})
export class PotDetailComponent implements OnInit, OnDestroy {

    pot: Pot;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private potService: PotService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPots();
    }

    load(id) {
        this.potService.find(id).subscribe((pot) => {
            this.pot = pot;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPots() {
        this.eventSubscriber = this.eventManager.subscribe(
            'potListModification',
            (response) => this.load(this.pot.id)
        );
    }
}
