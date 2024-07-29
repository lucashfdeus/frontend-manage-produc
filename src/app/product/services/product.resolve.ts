import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ProductService } from './product.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolve implements Resolve<Product> {

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    const id = route.paramMap.get('id');
    if (id) {
      return this.productService.getProductById(id).pipe(
        catchError(() => of(null as any))
      );
    } else {
      return of(null as any);
    }
  }
}
