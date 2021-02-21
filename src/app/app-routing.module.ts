import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGaurdService} from './service/auth-gaurd.service';
import {UsersComponent} from './users/users.component';
import {SparePartComponent} from './spare-part/spare-part.component';
import {BreakdownSlipComponent} from './breakdown-slip/breakdown-slip.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, data: {compName: 'Dashboard'}, canActivate: [AuthGaurdService]},
  {path: 'usermanage', component: UsersComponent, data: {compName: 'User'}, canActivate: [AuthGaurdService]},
  {path: 'sparepart', component: SparePartComponent, data: {compName: 'Spare Part'}, canActivate: [AuthGaurdService]},
  {path: 'breakdown', component: BreakdownSlipComponent, data: {compName: 'Breakdown Slip'}, canActivate: [AuthGaurdService]},
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
