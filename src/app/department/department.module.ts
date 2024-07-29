import { NgModule } from "@angular/core";
import { DepartmentAppComponent } from "./department.app.component";
import { DepartmentRoutingModule } from "./department.route";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { DepartmentService } from "./services/department.services";
import { CommonModule } from "@angular/common";
import { ListComponent } from "./list/list.component";

@NgModule({
  declarations: [
    DepartmentAppComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    DepartmentService,
  ]
})
export class DepartmentModule { }
