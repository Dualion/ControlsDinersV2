import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Proces } from './proces.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProcesService {

    private resourceApiUrl = SERVER_API_URL + 'api/proces';
    private resourcePublicUrl = SERVER_API_URL + 'public/proces';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    createProces(): Observable<Proces> {
        return this.http.post(this.resourceApiUrl, null).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    acabarProces(): Observable<Proces> {
        return this.http.post(`${this.resourceApiUrl}/terminate`, null).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    getProcesIsActive(): Observable<boolean> {
        return this.http.get(`${this.resourcePublicUrl}/actiu`).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse.actiu;
        });
    }

    find(id: number): Observable<Proces> {
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
}
