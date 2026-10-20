import { Component, computed, inject } from '@angular/core';
import { CartIngredientList } from './components/cart-ingredient-list';
import { CartService } from 'app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CartIngredientList],
  template: ` <app-cart-ingredient-list class="card" [ingredients]="ingredients()" /> `,
  styles: `
    :host {
      flex: 1 1 auto;
      padding: 24px;
    }
  `,
})
export class Cart {
  private cartService = inject(CartService);
  ingredients = computed(() => this.cartService.ingredients());
}
