import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NavigationDirection } from 'src/config/navigation-direction';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CalendarActionsService {

  dayNavigationActionSource = new Subject<NavigationDirection>();
  dayNavigationAction$ = this.dayNavigationActionSource.asObservable();

  dateSetActionSource = new Subject<Moment>();
  dateSetAction$ = this.dateSetActionSource.asObservable();

  constructor() { }

  // When a date is set.
  dateSelectionOccured(selectedDate: Moment) {
    this.dateSetActionSource.next(selectedDate);
  }

  // When navigation has occurred.
  dayNavigationOccured(direction: NavigationDirection) {
    this.dayNavigationActionSource.next(direction);
  }
}
