import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Client} from "./clients";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  readonly clients: Client[] = [
    {id: 'aaa', name: 'He-Man'},
    {id: 'bbb', name: 'She-Ra'},
    {id: 'ccc', name: 'Man-At-Arms'},
    {id: 'ddd', name: 'Teela'},
  ];

  getClients(): Observable<Client[]> {
    return of(this.clients);
  }
}
