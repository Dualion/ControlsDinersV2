/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ControlDinersTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PotDetailComponent } from '../../../../../../main/webapp/app/entities/pot/pot-detail.component';
import { PotService } from '../../../../../../main/webapp/app/entities/pot/pot.service';
import { Pot } from '../../../../../../main/webapp/app/entities/pot/pot.model';

describe('Component Tests', () => {

    describe('Pot Management Detail Component', () => {
        let comp: PotDetailComponent;
        let fixture: ComponentFixture<PotDetailComponent>;
        let service: PotService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ControlDinersTestModule],
                declarations: [PotDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PotService,
                    JhiEventManager
                ]
            }).overrideTemplate(PotDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PotDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PotService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Pot(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pot).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
