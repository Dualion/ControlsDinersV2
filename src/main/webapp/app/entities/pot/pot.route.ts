import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PotComponent } from './pot.component';
import { PotDetailComponent } from './pot-detail.component';

@Injectable()
export class PotResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const potRoute: Routes = [
    {
        path: 'pot',
        component: PotComponent,
        resolve: {
            'pagingParams': PotResolvePagingParams
        },
        data: {
            authorities: [],
            pageTitle: 'controlDinersApp.pot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pot/:id',
        component: PotDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'controlDinersApp.pot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
