import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppCustomerListComponent } from './app-customer-list/app-customer-list.component';
import { AppDetailsComponent } from './app-details/app-details.component';

const routes: Routes = [
  {
    path: 'customerEdit',
    component: AppDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
