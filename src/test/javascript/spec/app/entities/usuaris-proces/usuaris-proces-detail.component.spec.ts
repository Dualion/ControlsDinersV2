/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ControlDinersTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UsuarisProcesDetailComponent } from '../../../../../../main/webapp/app/entities/usuaris-proces/usuaris-proces-detail.component';
import { UsuarisProcesService } from '../../../../../../main/webapp/app/entities/usuaris-proces/usuaris-proces.service';
import { UsuarisProces } from '../../../../../../main/webapp/app/entities/usuaris-proces/usuaris-proces.model';

describe('Component Tests', () => {

    describe('UsuarisProces Management Detail Component', () => {
        let comp: UsuarisProcesDetailComponent;
        let fixture: ComponentFixture<UsuarisProcesDetailComponent>;
        let service: UsuarisProcesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ControlDinersTestModule],
                declarations: [UsuarisProcesDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UsuarisProcesService,
                    JhiEventManager
                ]
            }).overrideTemplate(UsuarisProcesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuarisProcesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarisProcesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UsuarisProces(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.usuarisProces).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
