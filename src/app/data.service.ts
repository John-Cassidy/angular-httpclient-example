import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Product } from './product';
import { Policy } from './policy';
import { Account as MyAccount } from './account';

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

  public getAccountsLimited() {
    return this.httpClient
      .get<MyAccount[]>(`${this.REST_API_SERVER}/accounts/`, {
        params: new HttpParams({ fromString: '_page=1&_limit=3' }),
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

  public getAccountsAll() {
    return this.httpClient
      .get<MyAccount[]>(`${this.REST_API_SERVER}/accounts/`, {
        params: new HttpParams({ fromString: '_page=1' }),
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

  public getAccountsSort(
    sortField,
    sortOrder, // 'asc','desc',
    pageNumber,
    pageSize
  ): Observable<HttpResponse<MyAccount[]>> {
    // return this.http.get('/api/lessons', {
    //     params: new HttpParams()
    //         .set('courseId', courseId.toString())
    //         .set('filter', filter)
    //         .set('sortOrder', sortOrder)
    //         .set('pageNumber', pageNumber.toString())
    //         .set('pageSize', pageSize.toString())
    // }).pipe(
    //     map(res =>  res["payload"])
    // );

    let params: HttpParams;

    if (pageNumber !== null) {
      params = new HttpParams()
        .set('_page', pageNumber.toString())
        .set('_limit', pageSize.toString())
        .set('_sort', sortField)
        .set('_order', sortOrder);
    } else {
      params = new HttpParams()
        .set('_page', '1')
        .set('_limit', '10000000')
        .set('_sort', sortField)
        .set('_order', sortOrder);
    }

    return this.httpClient
      .get<MyAccount[]>(`${this.REST_API_SERVER}/accounts/`, {
        params: params,
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
    return this.httpClient.get<Product[]>(url, { observe: 'response' }).pipe(
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
