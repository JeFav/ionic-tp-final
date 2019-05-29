import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiscogsApiService {

    httpOptions;
    discogsUrl = 'https://api.discogs.com/';
    token = 'ozXDrJaBzRVIvzZFrePhHFRYXSkbrwmLijSVycvN';

    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }

    private extractData(res: Response) {
        const body = res;
        return body || {};
    }

    search(params: string): Observable<any> {
        return this.http.get(this.discogsUrl + 'database/search?' + '&token=' + this.token, this.httpOptions).pipe(
            map( res => this.extractData(res)),
            catchError(this.handleError));
    }

    searchByArtist(params: object): Observable<any> {
        return this.http.get(this.discogsUrl + '/artists/' + params.artist_id, this.httpOptions).pipe(
            map(res => this.extractData(res)),
            catchError(this.handleError));
    }
    //
    // searchByArtistReleases(params: object): Observable<any> {
    //     return this.http.get(this.discogsUrl + '/artists/' + params.artist_id + '/releases?{' + params.sort + ',' + params.sort_order + '}', this.httpOptions).pipe(
    //         map(res => this.extractData(res)),
    //         catchError(this.handleError));
    // }


}
