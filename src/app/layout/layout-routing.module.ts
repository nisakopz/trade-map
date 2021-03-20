import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
// import { ContinentComponent } from '../continent/continent.component';
// import { DetailComponent } from './detail/detail.component';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
  { path: '',
  component: LayoutComponent,
//   children: [
//   {
//     path: 'detail',
//     component: DetailComponent,
//     canActivate: [AuthGuard]
//   },
//   {
//     path: 'continent/:name',
//     component: ContinentComponent,
//     canActivate:[AuthGuard]
//   }
// ]

},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
