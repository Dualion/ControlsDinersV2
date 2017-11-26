import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Quantitat } from './quantitat.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class QuantitatService {

    private resourceApiUrl = SERVER_API_URL + 'api/quantitats';
    private resourcePublicUrl = SERVER_API_URL + 'public/quantitats';

    constructor(private http: Http) { }

    create(quantitat: Quantitat): Observable<Quantitat> {
        const copy = this.convert(quantitat);
        return this.http.post(this.resourceApiUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    getActiva(): Observable<Quantitat> {
        return this.http.get(`${this.resourcePublicUrl}/activa`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Quantitat> {
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
     * Convert a returned JSON object to Quantitat.
     */
    private convertItemFromServer(json: any): Quantitat {
        const entity: Quantitat = Object.assign(new Quantitat(), json);
        return entity;
    }

    /**
     * Convert a Quantitat to a JSON which can be sent to the server.
     */
    private convert(quantitat: Quantitat): Quantitat {
        const copy: Quantitat = Object.assign({}, quantitat);
        return copy;
    }
}
