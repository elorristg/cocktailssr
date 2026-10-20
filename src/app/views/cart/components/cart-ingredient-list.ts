import { Component, computed, effect, input } from '@angular/core';

@Component({
  selector: 'app-cart-ingredient-list',
  imports: [],
  template: `
    <h2 class="mb">liste des ingrédients</h2>
    <ul>
      @for (ingredient of ingredientDisplays(); track $index) {
        <li class="my-2">{{ ingredient[0] }} : {{ ingredient[1] }}</li>
      } @empty {
        <p>aucun ingrédients n'a été ajouté pour le moment</p>
      }
    </ul>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class CartIngredientList {
  ingredients = input<string[]>([]);
  ingredientDisplays = computed(() =>
    Object.entries(
      this.ingredients().reduce(
        (acc, i) => {
          if (acc[i]) {
            acc[i]++;
          } else {
            acc[i] = 1;
          }
          return acc;
        },
        {} as { [s: string]: number },
      ),
    ),
  );

  constructor() {
    effect(() => {
      console.log(this.ingredientDisplays());
    });
  }
}
