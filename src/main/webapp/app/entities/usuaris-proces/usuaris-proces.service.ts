import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { UsuarisProces } from './usuaris-proces.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UsuarisProcesService {

    private resourcePublicUrl = SERVER_API_URL + 'public/usuaris-proces';

    constructor(private http: Http) { }

    getActiu(): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourcePublicUrl}/actiu`)
            .map((res: Response) => this.convertResponse(res));
    }

    find(id: number): Observable<UsuarisProces> {
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
     * Convert a returned JSON object to UsuarisProces.
     */
    private convertItemFromServer(json: any): UsuarisProces {
        const entity: UsuarisProces = Object.assign(new UsuarisProces(), json);
        return entity;
    }
}
