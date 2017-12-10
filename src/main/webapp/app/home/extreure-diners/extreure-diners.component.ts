import { Extreure } from '../../entities/pot/extreure.model';
import { Pot } from '../../entities/pot/pot.model';
import { PotService } from '../../entities/pot/pot.service';
import { Component, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-extreure-diners-modal',
    templateUrl: './extreure-diners.component.html'
})
export class ExtreureDinersModalComponent implements AfterViewInit {

    public diners: number;

    constructor(
        private potService: PotService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        public activeModal: NgbActiveModal
    ) {
        this.diners = null;
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#diners'), 'focus', []);
    }

    cancel() {
        this.activeModal.dismiss('cancel');
    }

    extreureDiners() {
        if ( this.diners != null && this.diners > 0.0 ) {
            this.potService.extreure(new Extreure(this.diners)).subscribe(
            (res: Pot) => {
                    this.activeModal.close(res);
                }
            );
        } else {
            this.activeModal.dismiss('dinersnotvalid');
        }
    }
}
