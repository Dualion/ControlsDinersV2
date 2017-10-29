import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Proces } from './proces.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProcesService {

    private resourceUrl = SERVER_API_URL + 'api/proces';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(proces: Proces): Observable<Proces> {
        const copy = this.convert(proces);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(proces: Proces): Observable<Proces> {
        const copy = this.convert(proces);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Proces> {
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
     * Convert a returned JSON object to Proces.
     */
    private convertItemFromServer(json: any): Proces {
        const entity: Proces = Object.assign(new Proces(), json);
        entity.dataInici = this.dateUtils
            .convertDateTimeFromServer(json.dataInici);
        return entity;
    }

    /**
     * Convert a Proces to a JSON which can be sent to the server.
     */
    private convert(proces: Proces): Proces {
        const copy: Proces = Object.assign({}, proces);

        copy.dataInici = this.dateUtils.toDate(proces.dataInici);
        return copy;
    }
}
