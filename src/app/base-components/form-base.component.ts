import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, fromEvent, merge } from 'rxjs';

import { GenericValidator, DisplayMessage, ValidationMessages } from '../utils/generic-form-validation';

export abstract class FormBaseComponent {

  displayMessage: DisplayMessage = {};
  genericValidator: GenericValidator | undefined;
  validationMessages: ValidationMessages | undefined;

  unsavedChanges: boolean = false;

  protected configureMessagesValidationBase(validationMessages: ValidationMessages) {
    this.genericValidator = new GenericValidator(validationMessages);
  }

  protected configureBaseFormValidation(
    formInputElements: ElementRef[],
    formGroup: FormGroup) {

    let controlBlurs: Observable<any>[] = formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.validateForm(formGroup)
    });
  }

  protected validateForm(formGroup: FormGroup) {
    if (this.genericValidator && formGroup) {
      this.displayMessage = this.genericValidator.processMessages(formGroup);
      this.unsavedChanges = true;
    }
  }
}
