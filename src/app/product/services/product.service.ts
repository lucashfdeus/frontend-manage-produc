import { Injectable } from "@angular/core";
import { BaseService } from "src/app/services/base.service";
import { Product } from "../models/product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { Department } from "../models/department";

@Injectable()
export class ProductService extends BaseService {

  product: Product = new Product();

  constructor(private http: HttpClient) { super(); }

  getAll(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.UrlServiceV1 + "products", super.GetAuthHeaderJson())
      .pipe(
        catchError(this.handleError)
      );
  }

  newProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.UrlServiceV1 + "products", product, super.GetAuthHeaderJson())
      .pipe(
        map((response: Product) => response),
        catchError(this.handleError)
      );
  }

  getProductById(id: string): Observable<Product> {
    return this.http
      .get<Product>(`${this.UrlServiceV1}products/${id}`, super.GetAuthHeaderJson())
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http
      .put<Product>(`${this.UrlServiceV1}products/${product.id}`, product, super.GetAuthHeaderJson())
      .pipe(
        catchError(this.handleError)
      );
  }



  deleteProduct(id: string): Observable<Product> {
    return this.http
      .delete<Product>(`${this.UrlServiceV1}products/${id}`, super.GetAuthHeaderJson())
      .pipe(
        catchError(this.handleError)
      );
  }

  //Metodo provisório
  getAllDepartment(): Observable<Department[]> {
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
