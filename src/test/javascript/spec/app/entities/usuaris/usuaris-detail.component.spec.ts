/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ControlDinersTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UsuarisDetailComponent } from '../../../../../../main/webapp/app/entities/usuaris/usuaris-detail.component';
import { UsuarisService } from '../../../../../../main/webapp/app/entities/usuaris/usuaris.service';
import { Usuaris } from '../../../../../../main/webapp/app/entities/usuaris/usuaris.model';

describe('Component Tests', () => {

    describe('Usuaris Management Detail Component', () => {
        let comp: UsuarisDetailComponent;
        let fixture: ComponentFixture<UsuarisDetailComponent>;
        let service: UsuarisService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ControlDinersTestModule],
                declarations: [UsuarisDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UsuarisService,
                    JhiEventManager
                ]
            }).overrideTemplate(UsuarisDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuarisDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarisService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Usuaris(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.usuaris).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
