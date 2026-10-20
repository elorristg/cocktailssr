import { httpResource } from '@angular/common/http';
import { Component, inject, signal, input, linkedSignal } from '@angular/core';
import { required, schema, form, FormRoot, FormField, applyEach } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { Cocktail, CocktailForm } from 'app/shared/interfaces';
import { BASE_URL, CocktailsService } from 'app/shared/services/cocktails.service';

@Component({
  selector: 'app-admin-cocktails-form',
  host: { class: 'card' },
  imports: [FormRoot, FormField],
  template: ` @if (cocktailId()) {
      <h3 class="mb">Edition d'un cocktail</h3>
    } @else {
      <h3 class="mb">Création d'un cocktail</h3>
    }

    <form [formRoot]="cocktailForm">
      <div class="flex flex-col gap-12 mb-10">
        <label for="name">Nom</label>
        <input type="text" id="name" [formField]="cocktailForm.name" />
        @let name = cocktailForm.name();
        @if (name.touched()) {
          @for (error of name.errors(); track error) {
            <p class="error">{{ error.message }}</p>
          }
        }
      </div>
      <div class="flex flex-col gap-12 mb-10">
        <label for="description">Description</label>
        <textarea type="text" id="description" rows="3" [formField]="cocktailForm.description">
        </textarea>
        @let description = cocktailForm.description();
        @if (description.touched()) {
          @for (error of description.errors(); track error) {
            <p class="error">{{ error.message }}</p>
          }
        }
      </div>
      <div class="flex flex-col gap-12 mb-10">
        <label for="imageUrl">Url</label>
        <input type="text" id="imageUrl" rows="3" [formField]="cocktailForm.imageUrl" />
        @let imageUrl = cocktailForm.imageUrl();
        @if (imageUrl.touched()) {
          @for (error of imageUrl.errors(); track error) {
            <p class="error">{{ error.message }}</p>
          }
        }
      </div>
      <div class="flex flex-col gap-12 mb-10">
        <div class="flex align-items-center">
          <label class="flex-auto">Ingrédients</label>
          <button class="btn btn-primary" type="button" (click)="addIngredient()">Ajouter</button>
        </div>
        <ul class="mb flex flex-col gap-12">
          @for (ingredient of cocktailForm.ingredients; track $index) {
            <li class="flex align-items-center gap-12">
              <input type="text" class="flex-auto" [formField]="ingredient" />
              <button class="btn btn-danger" type="button" (click)="deleteIngredient($index)">
                Supprimer
              </button>
            </li>
            @if (ingredient().touched()) {
              @for (error of imageUrl.errors(); track error) {
                <p class="error">{{ error.message }}</p>
              }
            }
          }
        </ul>
      </div>
      <button
        [disabled]="cocktailForm().submitting()"
        [class.disabled]="cocktailForm().invalid()"
        class="btn btn-primary"
      >
        Sauvegarder
      </button>
    </form>`,
  styles: `
    .card {
      padding: 8px;
    }
  `,
})
export class AdminCocktailsForm {
  private cocktailService = inject(CocktailsService);
  private router = inject(Router);
  cocktailId = input<string | null>();
  cocktailResource = httpResource<Cocktail | undefined>(() => {
    const id = this.cocktailId();
    return id ? `${BASE_URL}/${id}` : undefined;
  });

  cocktailModel = linkedSignal<Cocktail | undefined, CocktailForm>({
    source: () => {
      return this.cocktailResource.hasValue() ? this.cocktailResource.value() : undefined;
    },
    computation: (cocktail) => {
      if (cocktail) {
        return {
          name: cocktail.name,
          description: cocktail.description,
          imageUrl: cocktail.imageUrl,
          ingredients: [...cocktail.ingredients],
        };
      } else {
        return {
          name: '',
          description: '',
          imageUrl: '',
          ingredients: [],
        };
      }
    },
  });

  cocktailForm = form(
    this.cocktailModel,
    (schemaPath) => {
      required(schemaPath.name, {
        message: 'le nom du cocktail est obligatoire',
      });
      required(schemaPath.description, {
        message: 'la description du cocktail est obligatoire',
      });
      required(schemaPath.imageUrl, {
        message: "l'url de l'image du cocktail est obligatoire",
      });
      applyEach(schemaPath.ingredients, (schemaPathIngredient) => {
        required(schemaPathIngredient, { message: "Le nom de l'ingredient est obligatoire" });
      });
    },
    {
      submission: {
        action: async (field) => {
          const cocktailFormValue = field().value();
          const cocktailId = this.cocktailId();
          if (cocktailId) {
            await this.cocktailService.editCocktail(cocktailId, cocktailFormValue);
          } else {
            await this.cocktailService.createCocktail(cocktailFormValue);
          }

          this.router.navigateByUrl('./admin/cocktails/list');
        },
        onInvalid() {},
      },
    },
  );

  addIngredient() {
    this.cocktailForm.ingredients().value.update((ingredients) => [...ingredients, '']);
  }

  deleteIngredient(index: number) {
    this.cocktailForm
      .ingredients()
      .value.update((ingredients) => ingredients.filter((_, Iindex) => Iindex !== index));
  }
}
