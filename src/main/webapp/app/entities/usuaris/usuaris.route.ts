import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UsuarisComponent } from './usuaris.component';
import { UsuarisDetailComponent } from './usuaris-detail.component';
import { UsuarisPopupComponent } from './usuaris-dialog.component';
import { UsuarisDeletePopupComponent } from './usuaris-delete-dialog.component';

@Injectable()
export class UsuarisResolvePagingParams implements Resolve<any> {

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

export const usuarisRoute: Routes = [
    {
        path: 'usuaris',
        component: UsuarisComponent,
        resolve: {
            'pagingParams': UsuarisResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'controlDinersApp.usuaris.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'usuaris/:id',
        component: UsuarisDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'controlDinersApp.usuaris.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usuarisPopupRoute: Routes = [
    {
        path: 'usuaris-new',
        component: UsuarisPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'controlDinersApp.usuaris.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usuaris/:id/edit',
        component: UsuarisPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'controlDinersApp.usuaris.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usuaris/:id/delete',
        component: UsuarisDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'controlDinersApp.usuaris.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
