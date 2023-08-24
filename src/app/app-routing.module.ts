import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: '/auth', pathMatch: 'full' },

  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component').then(
        (module) => module.AuthComponent,
      ),
  },

  {
    path: 'products',
    loadComponent: () =>
    import('./products/products.component').then(
      (module) => module.ProductsComponent,
    ),
    canActivate: [AuthGuard],
  },

  {
    path: 'product/:id',
    loadComponent: () =>
    import('./product-details/product-details.component').then(
      (module) => module.ProductDetailsComponent,
    ),
    canActivate: [AuthGuard],
  },

  {
    path: 'about-us',
    loadComponent: () =>
    import('./info-pages/about-us/about-us.component').then(
      (module) => module.AboutUsComponent,
    ),
    canActivate: [AuthGuard],
  },

  {
    path: 'privacy-policy',
    loadComponent: () =>
    import('./info-pages/privacy-policy/privacy-policy.component').then(
      (module) => module.PrivacyPolicyComponent,
    ),
    canActivate: [AuthGuard],
  },

  {
    path: 'contact-us',
    loadComponent: () =>
    import('./info-pages/contact-us/contact-us.component').then(
      (module) => module.ContactUsComponent,
    ),
    canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    loadComponent: () =>
    import('./chat/chat.component').then(
      (module) => module.ChatComponent,
    ),
    canActivate: [AuthGuard],
  },
  {
    path: 'bag',
    loadComponent: () =>
    import('./bag/bag-page/bag-page.component').then(
      (module) => module.BagPageComponent,
    ),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
    import('./profile/profile.component').then(
      (module) => module.ProfileComponent,
    ),
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
