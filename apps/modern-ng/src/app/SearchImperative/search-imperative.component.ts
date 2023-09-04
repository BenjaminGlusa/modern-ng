import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientService} from "../Shared/data-access/client-service";
import {Subject, takeUntil} from "rxjs";
import {Client} from "../Shared/data-access/clients";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-search-imperative',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatToolbarModule, MatInputModule, MatCardModule],
  template: `
    <mat-toolbar>
      <span>Search Imperative</span>
    </mat-toolbar>
    <form>
      <mat-form-field>
        <mat-label>Search For Name:</mat-label>
        <input matInput placeholder="Ex. He-Man" [formControl]="searchField">
      </mat-form-field>
    </form>
    <mat-card *ngFor="let client of filteredClients">
      <mat-card-content>{{client.name}}</mat-card-content>
    </mat-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchImperativeComponent implements OnInit, OnDestroy{
  public searchField: FormControl;
  public clients: Client[] = [];
  public filteredClients: Client[] = [];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private clientService: ClientService) {
    this.searchField = new FormControl<string>('');
  }

  ngOnInit(): void {
    // Get client data
    this.clientService
      .getClients()
      .pipe(takeUntil(this.destroy$))
      .subscribe((clients) => {
        this.clients = clients;
        this.filteredClients = clients;
      });

    // React to changes in the search term
    this.searchField.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((searchTerm) => {
        this.filteredClients = this.clients.filter(
          (client) => {
            return client.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
          }
        )
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
