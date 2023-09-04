import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {combineLatest, map, startWith} from 'rxjs';
import {ClientService} from '../Shared/data-access/client-service';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-search-reactive',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
  ],
  template: `
    <mat-toolbar>
      <span>Search Reactive</span>
    </mat-toolbar>
    <form>
      <mat-form-field>
        <mat-label>Search For Name:</mat-label>
        <input matInput placeholder="Ex. He-Man" [formControl]="searchField"/>
      </mat-form-field>
    </form>
    <mat-card *ngFor="let client of filteredClients$ | async">
      <mat-card-content>{{ client.name }}</mat-card-content>
    </mat-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchReactiveComponent {
  public searchField = new FormControl('', {nonNullable: true});
  public filteredClients$ =
    combineLatest(
      [
        inject(ClientService).getClients(),
        this.searchField.valueChanges.pipe(
          startWith(this.searchField.value)
        )
      ]).pipe(
      map(([clients, searchTerm]) =>
        clients.filter(
          (client) =>
            searchTerm === '' ||
            client.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
}
