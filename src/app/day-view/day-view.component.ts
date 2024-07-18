import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { EventProviderService } from '../event-provider.service';
import { CalendarActionsService } from '../calendar-actions.service';
import { NavigationDirection } from 'src/config/navigation-direction';
import { CalendarQueryBuilderService } from '../calendar-query-builder.service';
import { ViewTypes } from 'src/config/view-type';
import { OperationIndicationService } from '../operation-indication.service';
@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.sass']
})
export class DayViewComponent implements OnInit {

  events = [];
  currentDateTime = moment();
  currentDay: string = null;
  currentDate: string = null;
  currentMonth: string = null;

  constructor(
    private eventProviderService: EventProviderService,
    private calenderActionsService: CalendarActionsService,
    private calendarQueryBuilder: CalendarQueryBuilderService,
    private operationIndicator: OperationIndicationService,
  ) {
    this.setDateVariables();
  }

  slots: string[] = [
    '00:00', '01:00', '02:00', '03:00', '04:00',
    '05:00', '06:00', '07:00', '08:00', '09:00',
    '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00',
    '20:00', '21:00', '22:00', '23:00',
  ];

  private setDateVariables() {
    this.currentDay = moment(this.currentDateTime).format('dddd');
    this.currentDate = moment(this.currentDateTime).format('Do');
    this.currentMonth = moment(this.currentDateTime).format('MMMM');
  }

  private convertTime(dateTimeString) {
    return moment(dateTimeString).format('HH:mm');
  }

  private processEvents(events: []) {
    this.events = events.map((event: any) => {
      event.startTime = this.convertTime(event.start.dateTime);
      event.endTime = this.convertTime(event.end.dateTime);
      event.name = event.summary;
      return event;
    });
  }

  private onDayChanged(newDate: moment.Moment) {
    this.currentDateTime = moment(newDate);
    // update the dates.
    this.setDateVariables();
  }

  private subscribeToNavigation() {
    this.calenderActionsService.dayNavigationAction$.subscribe((direction: NavigationDirection) => {
      // Change the date appropriately.
      // FIXME: the logic for calculating new dates is repeated in CalendarQuerybuilder and here.
      // TODO: refactor them into a util or something.

      // set the loading state
      this.operationIndicator.loading();

      let newDate = null;
      if (direction === NavigationDirection.NEXT) {
        newDate = moment(this.currentDateTime).add(1, 'day');
      }
      else if (direction === NavigationDirection.PREV) {
        newDate = moment(this.currentDateTime).subtract(1, 'day');
      }
      else if (direction === NavigationDirection.TODAY) {
        // reset to today.
        newDate = moment();
      }
      this.onDayChanged(newDate);
      // Query the calendar query options first.
      this.queryCalendar(direction);
    });
  }

  private subscribeToDateSelection() {
    this.calenderActionsService.dateSetAction$.subscribe((selectedDate: moment.Moment) => {
      this.operationIndicator.loading();
      this.onDayChanged(selectedDate);
      // refresh events for that day.
      this.queryCalendar(NavigationDirection.DATE_SELECTION);
    });
  }

  private subscribeToEventsRefreshed() {
    this.eventProviderService.eventsRefreshed$.subscribe((events: []) => {
      this.operationIndicator.complete();
      this.processEvents(events);
    });
  }

  private queryCalendar(direction: NavigationDirection) {
    this.eventProviderService.setQueryOptions(
      this.calendarQueryBuilder
        .setCurrentDate(this.currentDateTime)
        .setViewType(ViewTypes.DAY)
        .setDirection(direction)
        .build()
    );
    // refresh events, will lead to invoking the callbck inside `subscribeToEventsRefreshed.`
    this.eventProviderService.refreshEvents();
  }

  ngOnInit() {
    // subscription for events refreshed.
    this.subscribeToEventsRefreshed();
    // for calendar Next / Previous clicked.
    this.subscribeToNavigation();
    // for date selection event.
    this.subscribeToDateSelection();
  }
}
