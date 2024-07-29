import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { User } from "../models/user";

import { catchError, map, Observable } from "rxjs";
import { BaseService } from "src/app/services/base.service";

@Injectable()
export class AccountService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  registerUser(user: User): Observable<User> {
    let response = this.http
      .post(this.UrlServiceV1 + 'new-account', user, this.GetHeaderJson())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError));
    return response;
  }

  login(user: User): Observable<User> {
    let response = this.http
      .post(this.UrlServiceV1 + 'login', user, this.GetHeaderJson())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError));
    return response;
  }
}
