import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DepartmentAppComponent } from "./department.app.component";
import { ListComponent } from "./list/list.component";

const productRouterConfig: Routes = [
  {
    path: '', component: DepartmentAppComponent,
    children: [
      { path: 'list-all', component: ListComponent },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(productRouterConfig)
  ],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
