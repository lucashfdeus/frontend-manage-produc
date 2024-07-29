import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { ToastrService } from 'ngx-toastr';

import { AccountService } from '../services/account.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @ViewChildren('formInput') formInputElements!: QueryList<ElementRef>;

  errors: any[] = [];
  registerForm!: FormGroup;
  user!: User;

  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};

  unsavedChanges: boolean = false;


  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        minlength: 'A senha deve possuir pelo menos 6 caracteres',
        maxlength: 'A senha deve possuir no máximo 15 caracteres'
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        minlength: 'A senha deve possuir pelo menos 6 caracteres',
        maxlength: 'A senha deve possuir no máximo 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngAfterViewInit(): void {
    const blurEvents$: Observable<any> = merge(
      ...this.formInputElements.map(formControl =>
        fromEvent(formControl.nativeElement, 'blur')
      )
    );

    blurEvents$.subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.registerForm);
      this.unsavedChanges = true;
    });
  }

  addAccount(): void {
    if (this.registerForm.dirty && this.registerForm.valid) {
      this.user = { ...this.user, ...this.registerForm.value };
      this.accountService.registerUser(this.user)
        .subscribe(
          success => { this.processSuccess(success) },
          fail => { this.processFail(fail) }
        );

      this.unsavedChanges = false;
    }
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value
      ? { mismatch: true }
      : null;
  }

  processSuccess(response: any) {
    this.registerForm.reset();
    this.errors = [];

    this.accountService.LocalStorage.saveUserLocalData(response);

    this.toastr.success('Registro realizado com sucesso!', 'Bem Vindo!');
    this.router.navigate(['/home']);
  }

  processFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
