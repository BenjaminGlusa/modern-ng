import {Route} from '@angular/router';
import {NxWelcomeComponent} from "./nx-welcome.component";
import {SearchImperativeComponent} from "./SearchImperative/search-imperative.component";
import {SearchReactiveComponent} from "./SearchReactive/search-reactive.component";

export const appRoutes: Route[] = [
  {
    path: 'search/imperative',
    component: SearchImperativeComponent
  },
  {
    path: 'search/reactive',
    component: SearchReactiveComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: NxWelcomeComponent
  }
];
