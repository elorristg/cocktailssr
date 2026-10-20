import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer';
import { CocktailsComponent } from './views/cocktails/cocktails.component';
import { CocktailDetails } from './views/cocktails/components/cocktail-details';
import { seedData } from './shared/data/seed';
// import { RouterOutlet } from '../../node_modules/@angular/router/types/_router_module-chunk';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet],
  template: ` <app-header />
    <!-- <app-cocktails class="flex-auto" /> -->

    <div class="flex-auto flex flex-col">
      <router-outlet />
    </div>
    <app-footer />`,

  styles: `
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  `,
})
export class App {
  constructor() {
    // seedData();
  }
}
