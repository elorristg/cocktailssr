import { Component, input, output } from '@angular/core';
import { Cocktail } from '../../../shared/interfaces';
import { httpResource } from '@angular/common/http';
import { BASE_URL } from 'app/shared/services/cocktails.service';
@Component({
  selector: 'app-cocktail-details',
  imports: [],
  template: `
    @let c = cocktail();
    <div>
      <img class="mb" [src]="c.imageUrl" />
    </div>

    <h3 class="mb">{{ c.name }}</h3>
    <p class="mb">{{ c.description }}</p>

    <ul class="mb">
      @for (ingredient of c.ingredients; track $index) {
        <li class="my-2">{{ ingredient }}</li>
      }
    </ul>

    <div class="flex">
      <button (click)="addIngredients.emit(c.ingredients)" class="btn btn-primary">
        Ajouter le cocktail au panier
      </button>

      <span class="flex-auto"></span>

      @if (isLiked()) {
        <button class="btn btn-primary" (click)="unlikeCocktail.emit(c._id)">Unlike</button>
      } @else {
        <button class="btn btn-outline-primary" (click)="likeCocktail.emit(c._id)">Like</button>
      }
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
    }
    img {
      max-height: 300px;
    }
    ul {
      list-style: disc;
      padding-left: 20px;
      font-size: 14px;
      font-weight: 500px;
    }
  `,
})
export class CocktailDetails {
  cocktail = input.required<Cocktail>();
  // cocktailId = input.required<string>();
  // cocktailResource = httpResource<Cocktail | undefined>(() => `${BASE_URL}/${this.cocktailId()}`);
  isLiked = input.required<boolean>();
  likeCocktail = output<string>();
  unlikeCocktail = output<string>();
  addIngredients = output<string[]>();
}
