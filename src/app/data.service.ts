import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Product } from './product';
import { Policy } from './policy';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private REST_API_SERVER = 'http://localhost:3000';

  public first: string = '';
  public prev: string = '';
  public next: string = '';
  public last: string = '';

  constructor(private httpClient: HttpClient) {}

  public sendGetRequest() {
    // // Add safe, URL encoded_page parameter
    // const options = {
    //   params: new HttpParams({ fromString: '_page=1&_limit=20' }),
    // };
    // return this.httpClient
    //   .get(`${this.REST_API_SERVER}/products/`, options)
    //   .pipe(retry(3), catchError(this.handleError));

    return this.httpClient
      .get<Product[]>(`${this.REST_API_SERVER}/products/`, {
        params: new HttpParams({ fromString: '_page=1&_limit=20' }),
        observe: 'response',
      })
      .pipe(
        retry(3),
        catchError(this.handleError),
        tap((res) => {
          console.log(res.headers.get('Link'));
          this.parseLinkHeader(res.headers.get('Link'));
        })
      );
  }

  public getPolicies() {
    return this.httpClient
      .get<Policy[]>(`${this.REST_API_SERVER}/policies/`, {
        params: new HttpParams({ fromString: '_page=1&_limit=20' }),
        observe: 'response',
      })
      .pipe(
        retry(3),
        catchError(this.handleError),
        tap((res) => {
          console.log(res.headers.get('Link'));
          this.parseLinkHeader(res.headers.get('Link'));
        })
      );
  }

  public sendGetRequestToUrl(url: string) {
    return this.httpClient
      .get<Product[]>(url, { observe: 'response' })
      .pipe(
        retry(3),
        catchError(this.handleError),
        tap((res) => {
          console.log(res.headers.get('Link'));
          this.parseLinkHeader(res.headers.get('Link'));
        })
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unkown error!';
    if (error.error instanceof ErrorEvent) {
      // client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  parseLinkHeader(header) {
    if (header.length == 0) {
      return;
    }

    let parts = header.split(',');
    var links = {};
    parts.forEach((p) => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });

    this.first = links['first'];
    this.last = links['last'];
    this.prev = links['prev'];
    this.next = links['next'];
  }
}
