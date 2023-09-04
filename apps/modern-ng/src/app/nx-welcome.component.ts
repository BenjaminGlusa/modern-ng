import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-nx-welcome',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h1>"Modern" Angular</h1>
    <ul>
      <li><a routerLink="/search/imperative">Search Imperative</a></li>
      <li><a routerLink="/search/reactive">Search Reactive</a></li>
    </ul>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
