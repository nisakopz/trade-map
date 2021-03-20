import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ContinentComponent } from './continent/continent.component';
import { DetailComponent } from './detail/detail.component';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  {
    path: 'detail',
    component: DetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'continent/:name',
    component: ContinentComponent,
    canActivate:[AuthGuard]
  }, 
  
  
  {
    path: 'auth',
    // canActivate:[AuthGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: "", redirectTo: "/detail", pathMatch: "full" },

  {
    path: 'logout',
    component: LogoutComponent,
    canActivate:[AuthGuard]
  }, 

  // {
  //   path: 'trade',
  //   canActivate:[AuthGuard],
  //   loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
