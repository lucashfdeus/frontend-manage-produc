import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { User } from "../models/user";
import { BaseService } from "src/app/services/base.service";

@Injectable()
export class AccountService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  registerUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.UrlServiceV1 + 'new-account', user, this.GetHeaderJson())
      .pipe(
        map(response => this.extractData<User>(response)),
        catchError(this.serviceError)
      );
  }

  login(user: User): Observable<User> {
    return this.http
      .post<User>(this.UrlServiceV1 + 'login', user, this.GetHeaderJson())
      .pipe(
        map(response => this.extractData<User>(response)),
        catchError(this.serviceError)
      );
  }
}
