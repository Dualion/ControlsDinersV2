import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Pot } from './pot.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PotService {

    private resourceUrl = SERVER_API_URL + 'api/pots';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(pot: Pot): Observable<Pot> {
        const copy = this.convert(pot);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(pot: Pot): Observable<Pot> {
        const copy = this.convert(pot);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Pot> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
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

    /**
     * Convert a Pot to a JSON which can be sent to the server.
     */
    private convert(pot: Pot): Pot {
        const copy: Pot = Object.assign({}, pot);

        copy.data = this.dateUtils.toDate(pot.data);
        return copy;
    }
}
