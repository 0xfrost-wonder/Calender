import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationIndicationService {
  isLoading = false;
  requestInflightSource = new Subject<boolean>();
  requestInFlight$ = this.requestInflightSource.asObservable();

  constructor() { }

  loading() {
    this.isLoading = true;
    this.requestInflightSource.next(true);
  }

  complete() {
    this.isLoading = false;
    this.requestInflightSource.next(false);
  }

}
