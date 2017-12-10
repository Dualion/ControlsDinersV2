import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { QuantitatComponent } from './quantitat.component';
import { QuantitatDetailComponent } from './quantitat-detail.component';

@Injectable()
export class QuantitatResolvePagingParams implements Resolve<any> {

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

export const quantitatRoute: Routes = [
    {
        path: 'quantitat',
        component: QuantitatComponent,
        resolve: {
            'pagingParams': QuantitatResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'controlDinersApp.quantitat.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'quantitat/:id',
        component: QuantitatDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'controlDinersApp.quantitat.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
