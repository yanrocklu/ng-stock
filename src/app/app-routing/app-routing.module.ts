import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, PreloadAllModules, Routes} from "@angular/router";

import {HomeComponent} from "../home/home.component";
import {StocksComponent} from "../stocks/stocks.component";
import {StockStartComponent} from "../stocks/stock-start/stock-start.component";
import {StockDetailComponent} from "../stocks/stock-detail/stock-detail.component";
import {StockEditComponent} from "../stocks/stock-edit/stock-edit.component";


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'stocks', component: StocksComponent,
    children: [
      {path: '', component: StockStartComponent},
      {path: 'new', component: StockEditComponent},
      {path: ':id', component: StockDetailComponent},
      {path: ':id/edit', component: StockEditComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
