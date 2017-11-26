import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProcesComponent } from './proces.component';
import { ProcesDetailComponent } from './proces-detail.component';

@Injectable()
export class ProcesResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const procesRoute: Routes = [
    {
        path: 'proces',
        component: ProcesComponent,
        resolve: {
            'pagingParams': ProcesResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'controlDinersApp.proces.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'proces/:id',
        component: ProcesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'controlDinersApp.proces.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
