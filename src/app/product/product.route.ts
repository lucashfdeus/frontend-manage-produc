import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductAppComponent } from "./product.app.component";
import { ListComponent } from "./list/list.component";
import { NewComponent } from "./new/new.component";
import { DetailsComponent } from "./details/details.component";
import { ProductResolve } from "./services/product.resolve";
import { EditComponent } from "./edit/edit.component";
import { DeleteComponent } from "./delete/delete.component";

const productRouterConfig: Routes = [
  {
    path: '', component: ProductAppComponent,
    children: [
      { path: 'add-new', component: NewComponent },
      {
        path: 'details/:id', component: DetailsComponent,
        resolve: { product: ProductResolve }
      },
      {
        path: 'edit/:id', component: EditComponent,
        resolve: { product: ProductResolve }
      },
      {
        path: 'delete/:id', component: DeleteComponent,
        resolve: { product: ProductResolve }
      },
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
export class ProductRoutingModule { }
