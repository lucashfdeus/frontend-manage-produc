import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Department } from '../models/department';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {

  product!: Product;
  departments: Department[] = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadDepartments();
    this.route.data.subscribe(data => {
      this.product = data['product'];
      if (!this.product) {
        this.errorMessage = 'Produto não encontrado.';
      }
    });
  }

  loadDepartments(): void {
    this.productService.getAllDepartment().subscribe({
      next: (departments: Department[]) => this.departments = departments,
      error: (error: any) => this.errorMessage = 'Falha ao carregar departamentos'
    });
  }

  getDepartmentName(code: string): string {
    const department = this.departments.find(dept => dept.code === code);
    return department ? department.description : 'Desconhecido';
  }
}
