import { Component, OnInit } from "@angular/core";
import { Product } from "../models/product";
import { Department } from "../models/department";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../services/product.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
})
export class DeleteComponent implements OnInit {

  product!: Product;
  departments: Department[] = [];
  errorMessage: string = '';
  errors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
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

  removeProduct() {
    this.productService.deleteProduct(this.product.id)
      .subscribe(
        product => { this.processSuccess(product) },
        error => { this.processFail(error) }
      );
  }


  processSuccess(response: any) {
    this.toastr.success('Produto salvo sucesso!', 'Sucesso!');
    this.router.navigate(['/product/list-all']);
  }

  processFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
