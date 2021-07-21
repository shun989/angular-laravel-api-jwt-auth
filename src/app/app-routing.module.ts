import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from './components/signup/signup.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';

import {AuthGuard} from "./shared/auth.guard";
import {MasterComponent} from "./components/layouts/master/master.component";
import {HomeComponent} from "./components/home/home.component";
import {PublicComponent} from "./components/public/public.component";


const routes: Routes = [

  {
    path: '',
    component: PublicComponent
  },

  {
    path: 'admin',
    component: MasterComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },

      {
        path: 'user-profile',
        component: UserProfileComponent,
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'products',
        loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
      }
    ],
    canActivate: [AuthGuard]
  },

  {
    path: 'admin/log-in',
    component: SigninComponent
  },

  {
    path: 'admin/sign-up',
    component: SignupComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
