import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Usuaris } from './usuaris.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UsuarisService {

    private resourceApiUrl = SERVER_API_URL + 'api/usuarises';
    private resourcePublicUrl = SERVER_API_URL + 'public/usuarises';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(usuaris: Usuaris): Observable<Usuaris> {
        const copy = this.convert(usuaris);
        return this.http.post(this.resourceApiUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(usuaris: Usuaris): Observable<Usuaris> {
        const copy = this.convert(usuaris);
        return this.http.put(this.resourceApiUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Usuaris> {
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
     * Convert a returned JSON object to Usuaris.
     */
    private convertItemFromServer(json: any): Usuaris {
        const entity: Usuaris = Object.assign(new Usuaris(), json);
        entity.dataInici = this.dateUtils
            .convertDateTimeFromServer(json.dataInici);
        return entity;
    }

    /**
     * Convert a Usuaris to a JSON which can be sent to the server.
     */
    private convert(usuaris: Usuaris): Usuaris {
        const copy: Usuaris = Object.assign({}, usuaris);

        copy.dataInici = this.dateUtils.toDate(usuaris.dataInici);
        return copy;
    }
}
