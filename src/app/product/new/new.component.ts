import { Component, ElementRef, OnInit, QueryList, ViewChildren } from "@angular/core";
import { FormBuilder, FormGroup, MaxValidator, Validators } from "@angular/forms";
import { FormBaseComponent } from "src/app/base-components/form-base.component";
import { Product } from "../models/product";
import { ProductService } from "../services/product.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Department } from "../models/department";
import { fromEvent, merge, Observable } from "rxjs";
import { GenericValidator } from "src/app/utils/generic-form-validation";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent extends FormBaseComponent implements OnInit {

  @ViewChildren('formInput') formInputElements!: QueryList<ElementRef>;

  errors: any[] = [];
  productForm!: FormGroup;
  product: Product = new Product();

  departments: Department[] = [];
  override genericValidator!: GenericValidator;


  formResult: string = '';

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService) {

    super();

    this.validationMessages = {
      description: {
        required: 'Informe a descrição'
      },
      departmentCode: {
        required: 'Informe o departamento'
      },
      price: {
        required: 'Informe a preço'
      },
    };

    super.configureMessagesValidationBase(this.validationMessages);
  }

  ngOnInit(): void {

    this.productForm = this.fb.group({
      description: ['', [Validators.required]],
      departmentCode: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      status: [true]
    });

    this.loadDepartments();
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

  addProduct() {
    if (this.productForm.dirty && this.productForm.valid) {

      let priceValue = this.productForm.get('price')?.value;

      if (typeof priceValue === 'string') {
        priceValue = parseFloat(priceValue.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
      } else {
        priceValue = parseFloat(priceValue.toString());
      }

      this.product = Object.assign({}, this.product, {
        ...this.productForm.value,
        price: priceValue
      });

      this.formResult = JSON.stringify(this.product);

      this.productService.newProduct(this.product)
        .subscribe(
          success => { this.processSuccess(success) },
          fail => { this.processFail(fail) }
        );
    }
  }

  loadDepartments(): void {
    this.productService.getAllDepartment().subscribe(
      (data: Department[]) => {
        this.departments = data;
      },
      (error) => {
        this.errors.push('Falha ao carregar departamentos');
      }
    );
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
}
