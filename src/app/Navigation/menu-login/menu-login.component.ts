import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageUtils } from "src/app/utils/localstorage";

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html'
})
export class MenuLoginComponent {

  token: string = "";
  user: any;
  email: string = "";
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) { }

  userLogged(): boolean {
    const token = this.localStorageUtils.getUserToken();
    this.token = token ?? '';
    this.user = this.localStorageUtils.getUser();

    if (this.user && this.user.email) {
      this.email = this.user.email;
    } else {
      this.email = '';
    }

    const isLogged = this.token !== '';
    return isLogged;
  }

  logout() {
    this.localStorageUtils.clearUserLocalData();
    this.router.navigate(['account/login']);
  }
}
