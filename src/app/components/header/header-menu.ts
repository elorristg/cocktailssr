import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <button (click)="toggleMenu()">=</button>
    @if (show()) {
      <ul>
        @for (link of navigations; track $index) {
          <li (click)="show.set(false)" class="mb" [class.mb]="!$last">
            <a [routerLink]="link.path" routerLinkActive="active-link">{{ link.name }}</a>
          </li>
        }
      </ul>
    }
  `,
  styles: `
    button {
      padding: 16px;
      font-size: 24px;
      border: none;
      background-color: inherit;
      color: white;
    }
    ul {
      position: absolute;
      right: 12px;
      top: 64px;
      padding: 12px;
      border: var(--border);
      border-radius: var(--radius);
      color: var(--text-color);
      background-color: white;
    }
  `,
})
export class HeaderMenu {
  show = signal(false);
  navigations = [
    {
      path: '/admin',
      name: 'Admin',
    },
    {
      path: '/cocktails',
      name: 'Cocktails',
    },

    {
      path: '/cart',
      name: 'Panier',
    },
  ];

  toggleMenu() {
    this.show.update((s) => !s);
  }
}
