/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ControlDinersTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { QuantitatDetailComponent } from '../../../../../../main/webapp/app/entities/quantitat/quantitat-detail.component';
import { QuantitatService } from '../../../../../../main/webapp/app/entities/quantitat/quantitat.service';
import { Quantitat } from '../../../../../../main/webapp/app/entities/quantitat/quantitat.model';

describe('Component Tests', () => {

    describe('Quantitat Management Detail Component', () => {
        let comp: QuantitatDetailComponent;
        let fixture: ComponentFixture<QuantitatDetailComponent>;
        let service: QuantitatService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ControlDinersTestModule],
                declarations: [QuantitatDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    QuantitatService,
                    JhiEventManager
                ]
            }).overrideTemplate(QuantitatDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuantitatDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuantitatService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Quantitat(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.quantitat).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
