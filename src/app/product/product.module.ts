import { NgModule } from "@angular/core";
import { ProductAppComponent } from "./product.app.component";
import { ProductRoutingModule } from "./product.route";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ListComponent } from "./list/list.component";
import { ProductService } from './services/product.service';
import { NewComponent } from "./new/new.component";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CurrencyFormatPipe } from "../utils/currency-format.pipe";
import { DetailsComponent } from "./details/details.component";
import { ProductResolve } from "./services/product.resolve";
import { RouterModule } from "@angular/router";
import { EditComponent } from "./edit/edit.component";
import { DeleteComponent } from "./delete/delete.component";



@NgModule({
  declarations: [
    ProductAppComponent,
    NewComponent,
    ListComponent,
    DetailsComponent,
    EditComponent,
    DeleteComponent,
    CurrencyFormatPipe
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    ProductService,
    provideNgxMask(),
    ProductResolve
  ]
})
export class ProductModule { }
