import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Department } from '../models/department';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  products: Product[] = [];
  departments: Department[] = [];
  errorMessage: string = '';
  invalidDepartments: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadProducts();
  }

  loadDepartments(): void {
    this.productService.getAllDepartment().subscribe({
      next: (departments: Department[]) => {
        this.departments = departments;
      },
      error: (error: any) => this.errorMessage = 'Falha ao carregar departamentos'
    });
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.validateDepartments();
      },
      error: (error: any) => this.errorMessage = 'Falha ao carregar produtos'
    });
  }

  validateDepartments(): void {
    this.invalidDepartments = this.products.filter(product =>
      !this.departments.some(dept => dept.code === product.departmentCode)
    );
  }

  getDepartmentName(code: string): string {
    const department = this.departments.find(dept => dept.code === code);
    return department ? department.description : 'Desconhecido';
  }
}
