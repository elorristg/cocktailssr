import { inject, Injectable, resource } from '@angular/core';
import { Cocktail, CocktailForm } from '../interfaces';
import { httpResource } from '@angular/common/http';
import { Router } from '@angular/router';
export const BASE_URL = 'https://restapi.fr/api/cocktails-v3';
@Injectable({
  providedIn: 'root',
})
export class CocktailsService {
  // cocktailsResource = resource({
  //   loader: async (): Promise<Cocktail[]> => (await fetch(BASE_URL)).json(),
  // });

  // Refactorisation optionnelle avec Angular 20 httpResource
  cocktailsResource = httpResource<Cocktail[]>(() => BASE_URL);

  async deleteCocktail(cocktailId: string) {
    await fetch(`${BASE_URL}/${cocktailId}`, {
      method: 'DELETE',
    });
    this.cocktailsResource.reload();
  }

  async createCocktail(cocktailForm: CocktailForm) {
    const response = await fetch(`${BASE_URL}?delay=3`, {
      method: 'POST',
      body: JSON.stringify(cocktailForm),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body);
    }
    this.cocktailsResource.reload();
    return body;
  }

  async editCocktail(cocktailId: string, cocktailForm: CocktailForm) {
    const response = await fetch(`${BASE_URL}/${cocktailId}`, {
      method: 'PATCH',
      body: JSON.stringify(cocktailForm),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body);
    }
    this.cocktailsResource.reload();
    return body;
  }
}
