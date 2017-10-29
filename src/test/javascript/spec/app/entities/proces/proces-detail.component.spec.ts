/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ControlDinersTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProcesDetailComponent } from '../../../../../../main/webapp/app/entities/proces/proces-detail.component';
import { ProcesService } from '../../../../../../main/webapp/app/entities/proces/proces.service';
import { Proces } from '../../../../../../main/webapp/app/entities/proces/proces.model';

describe('Component Tests', () => {

    describe('Proces Management Detail Component', () => {
        let comp: ProcesDetailComponent;
        let fixture: ComponentFixture<ProcesDetailComponent>;
        let service: ProcesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ControlDinersTestModule],
                declarations: [ProcesDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProcesService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProcesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProcesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProcesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Proces(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.proces).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
