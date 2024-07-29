import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { CanActivate, CanDeactivate, Router } from "@angular/router";
import { RegisterComponent } from "../register/register.component";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanDeactivate<RegisterComponent>, CanActivate {

  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) { }

  canDeactivate(component: RegisterComponent): boolean {
    if (component.unsavedChanges) {
      return window.confirm('Abandonar preenchimento?');
    }
    return true;
  }

  canActivate(): boolean {
    if (this.localStorageUtils.getUserToken()) {
      this.router.navigate(['/home']);
    }
    return true;
  }
}
