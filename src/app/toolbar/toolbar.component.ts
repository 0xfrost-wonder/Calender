import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarActionsService } from '../calendar-actions.service';
import { NavigationDirection } from 'src/config/navigation-direction';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  today: string = moment().format('dddd, DD MMMM').toString();
  month: string = moment().format('MMMM').toString();
  year: string = moment().format('YYYY').toString();
  ranges: string[] = ['Day', 'Week', 'Month', 'Year', 'Schedule', '4 days'];
  defaultSelection = 'Day';

  getNavigationDirections() { return NavigationDirection; }

  constructor(private calendarActionsService: CalendarActionsService) { }

  onDateSelected($event) {
    this.month = moment($event.value).format('MMMM').toString();
    this.year = moment($event.value).format('YYYY').toString();
    this.calendarActionsService.dateSelectionOccured($event.value);
  }

  navigateDay(direction: NavigationDirection) {
    this.calendarActionsService.dayNavigationOccured(direction);
  }

  ngOnInit(): void {
  }

}
