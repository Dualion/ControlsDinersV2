import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Pot } from './pot.model';
import { ResponseWrapper, createRequestOption } from '../../shared';
import { Extreure } from './extreure.model';
import { Pagament } from './pagament.model';

@Injectable()
export class PotService {

    private resourceApiUrl = SERVER_API_URL + 'api/pots';
    private resourcePublicUrl = SERVER_API_URL + 'public/pots';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    find(id: number): Observable<Pot> {
        return this.http.get(`${this.resourcePublicUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourcePublicUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    getLast(): Observable<Pot> {
        return this.http.get(`${this.resourcePublicUrl}/last`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    pagament(pagament: Pagament): Observable<Pot> {
        return this.http.post(`${this.resourceApiUrl}/pagament`, pagament).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    cancelarPagament(pagament: Pagament): Observable<Pot> {
        return this.http.post(`${this.resourceApiUrl}/cancelarpagament`, pagament).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    extreure(extreure: Extreure): Observable<Pot> {
        return this.http.post(`${this.resourceApiUrl}/cancelarpagament`, extreure).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Pot.
     */
    private convertItemFromServer(json: any): Pot {
        const entity: Pot = Object.assign(new Pot(), json);
        entity.data = this.dateUtils
            .convertDateTimeFromServer(json.data);
        return entity;
    }

}
