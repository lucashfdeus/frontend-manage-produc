import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Department } from "src/app/product/models/department";
import { BaseService } from "src/app/services/base.service";

@Injectable()
export class DepartmentService extends BaseService {

  department: Department = new Department();

  constructor(private http: HttpClient) { super(); }

  getAll(): Observable<Department[]> {
    return this.http
      .get<Department[]>(this.UrlServiceV1 + "departments", super.GetAuthHeaderJson())
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
