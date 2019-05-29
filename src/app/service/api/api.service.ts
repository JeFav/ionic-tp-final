import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
            observe: 'response' as 'body'
        };
    }

    httpOptions;
    apiUrl = 'http://localhost:3000/';

    private static extractData(parameters: { res: Response }) {
        const res = parameters.res;
        const body = res;
        return body || {};
    }

    private static handleError(error: HttpErrorResponse) {
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

    getUsers(): Observable<any> {
        return this.http.get(this.apiUrl, this.httpOptions).pipe(
            map(res => {
                return ApiService.extractData({res});
            }),
            catchError(ApiService.handleError));
    }

    getUserById(id: string): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get(url, this.httpOptions).pipe(
            map(res => ApiService.extractData({res: res})),
            catchError(ApiService.handleError));
    }

    postUser(data): Observable<any> {
        const url = `${this.apiUrl}/add_with_students`;
        return this.http.post(url, data, this.httpOptions)
            .pipe(
                catchError(ApiService.handleError)
            );
    }

    updateUser(id: string, data): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put(url, data, this.httpOptions)
            .pipe(
                catchError(ApiService.handleError)
            );
    }

    deleteUser(id: string): Observable<{}> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url, this.httpOptions)
            .pipe(
                catchError(ApiService.handleError)
            );
    }
}
