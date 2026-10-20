import { Routes } from '@angular/router';
import { CocktailsComponent } from './views/cocktails/cocktails.component';
import { NotFoundComponent } from './views/not-found-component';
import { CartIngredientList } from './views/cart/components/cart-ingredient-list';
import { CartService } from './shared/services/cart.service';

export const routes: Routes = [
  {
    path: 'cocktails',
    component: CocktailsComponent,
  },
  {
    path: 'cart',
    loadComponent: async () => (await import('./views/cart/cart')).Cart,
  },
  {
    path: 'admin',
    loadChildren: async () => (await import('./views/admin/admin.routes')).routes,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cocktails',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
