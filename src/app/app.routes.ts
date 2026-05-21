import { Routes } from '@angular/router';

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
  loadComponent: () =>
    import(
      './features/cart/pages/cart-page/cart-page'
    ).then(m => m.CartPage)
}

];