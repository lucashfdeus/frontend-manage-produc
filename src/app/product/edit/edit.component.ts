import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/utils/generic-form-validation';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Department } from '../models/department';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { fromEvent, merge, Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent extends FormBaseComponent implements OnInit {
  @ViewChildren('formInput') formInputElements!: QueryList<ElementRef>;

  errors: any[] = [];
  productForm!: FormGroup;
  product: Product = new Product();
  departments: Department[] = [];
  override genericValidator!: GenericValidator;
  formResult: string = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    super();

    this.validationMessages = {
      description: {
        required: 'Informe a descrição'
      },
      departmentCode: {
        required: 'Informe o departamento',
        validDepartment: 'Departamento inválido'
      },
      price: {
        required: 'Informe o preço',
        pattern: 'Preço inválido'
      },
    };

    super.configureMessagesValidationBase(this.validationMessages);
  }

  ngOnInit(): void {
    this.createForm();

    this.route.data.subscribe(data => {
      this.product = data['product'];
      if (this.product) {
        this.loadDepartments();
      }
    });
  }

  private createForm() {
    this.productForm = this.fb.group({
      id: [''],
      description: ['', Validators.required],
      departmentCode: ['', [Validators.required, this.validDepartment.bind(this)]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      status: [false]
    });
  }

  loadDepartments(): void {
    this.productService.getAllDepartment().subscribe(
      (data: Department[]) => {
        this.departments = data;
        this.preencherForm();
      },
      (error) => {
        this.errors.push('Falha ao carregar departamentos');
      }
    );
  }

  validDepartment(control: AbstractControl): { [key: string]: boolean } | null {
    const departmentCode = control.value;
    const isValid = this.departments.some(dept => dept.code === departmentCode);
    return isValid ? null : { validDepartment: true };
  }

  preencherForm() {
    if (this.product && this.productForm) {
      this.productForm.patchValue({
        id: this.product.id,
        description: this.product.description,
        departmentCode: this.product.departmentCode,
        price: this.product.price,
        status: this.product.status
      });
    }
  }

  editProduct() {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
    });

    this.productForm.markAllAsTouched();

    if (this.productForm.dirty && this.productForm.valid) {
      let priceValue = this.productForm.get('price')?.value;

      if (typeof priceValue === 'string') {
        priceValue = parseFloat(priceValue.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
      } else {
        priceValue = parseFloat(priceValue.toString());
      }

      this.product = {
        ...this.productForm.value,
        price: priceValue
      };

      this.formResult = JSON.stringify(this.product);

      this.productService.updateProduct(this.product)
        .subscribe(
          success => { this.processSuccess(success) },
          fail => { this.processFail(fail) }
        );
    }
  }

  processSuccess(response: any) {
    this.productForm.reset();
    this.errors = [];
    this.unsavedChanges = false;

    this.toastr.success('Produto salvo sucesso!', 'Sucesso!');
    this.router.navigate(['/product/list-all']);
  }

  processFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  ngAfterViewInit(): void {
    const blurEvents$: Observable<any> = merge(
      ...this.formInputElements.map(formControl =>
        fromEvent(formControl.nativeElement, 'blur')
      )
    );

    blurEvents$.subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.productForm);
      this.unsavedChanges = true;
    });
  }
}
