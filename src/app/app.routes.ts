import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },

  {
    path: 'products',
    loadComponent: () =>
      import(
        './features/products/pages/product-list/product-list'
      ).then(m => m.ProductList)
  },
{
  path: 'products/:productId',

  loadComponent: () =>
    import(
      './features/products/pages/product-detail/product-detail'
    ).then(m => m.ProductDetail)
},
{
  path: 'cart',

  canActivate: [authGuard],

  loadComponent: () =>
    import(
      './features/cart/pages/cart-page/cart-page'
    ).then(m => m.CartPage)
},
{
  path: 'login',

  loadComponent: () =>
    import(
      './features/auth/pages/login/login'
    ).then(m => m.Login)
},

{
  path: 'register',

  loadComponent: () =>
    import(
      './features/auth/pages/register/register'
    ).then(m => m.Register)
}

];