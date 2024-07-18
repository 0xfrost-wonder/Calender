import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ViewTypes } from 'src/config/view-type';
import { NavigationDirection } from 'src/config/navigation-direction';

@Injectable({
  providedIn: 'root'
})
export class CalendarQueryBuilderService {

  viewType: ViewTypes;
  direction: NavigationDirection;
  currentDate: moment.Moment;

  constructor() { }

  setViewType(viewType: ViewTypes) {
    this.viewType = viewType;
    return this;
  }

  setDirection(direction: NavigationDirection) {
    this.direction = direction;
    return this;
  }

  setCurrentDate(date: moment.Moment) {
    this.currentDate = moment(date);
    return this;
  }

  private minTime(date: moment.Moment): moment.Moment {
    return date.set({hour: 0, minute: 0, second: 0});
  }

  private maxTime(date: moment.Moment): moment.Moment {
    return date.set({hour: 23, minute: 59, second: 59});
  }


  /**
   * NOTE: currentDate is the "CHANGED DATE !!!!". Deal accordingly
   * yeah this is ugly. I don't have time.
   * Will refactor if I get a couple of days.
   */
  build() {
    if (!this.currentDate) {
      throw new Error('No current date specified!');
    }
    // else continue.
    let maxLimit: moment.Moment = null;
    let minLimit: moment.Moment = null;

    if (this.viewType === ViewTypes.DAY) {
      // We need to create new objects of "moment" because
      // Moment is stupid at functional programming and mutates
      // the original argument, hence leading to crappy dates.
      maxLimit = moment(this.currentDate).endOf('day');
      minLimit = moment(this.currentDate).startOf('day');
    } else if (this.viewType === ViewTypes.MONTH) {
      // TODO: Change these once you get to Month view.
      if (this.direction === NavigationDirection.PREV) {
        minLimit = this.minTime(this.currentDate.subtract(1, 'month')
          .startOf('month'));
        maxLimit = this.maxTime(this.currentDate.subtract(1, 'month')
          .endOf('month'));
      } else if (this.direction === NavigationDirection.NEXT) {
        maxLimit = this.maxTime(this.currentDate.add(1, 'month').endOf('month'));
        minLimit = this.minTime(this.currentDate.add(1, 'month').startOf('month'));
      }
    } else if (this.viewType === ViewTypes.WEEK) {
      if (this.direction === NavigationDirection.PREV) {
        maxLimit = this.maxTime(this.currentDate.subtract(1, 'week').endOf('week'));
        minLimit = this.minTime(this.currentDate.subtract(1, 'week').startOf('week'));
      } else if (this.direction === NavigationDirection.NEXT) {
        maxLimit = this.maxTime(this.currentDate.add(1, 'week').endOf('week'));
        minLimit = this.minTime(this.currentDate.add(1, 'week').startOf('week'));
      }
    } else if (this.viewType === ViewTypes.YEAR) {
      if (this.direction === NavigationDirection.PREV) {
        maxLimit = this.maxTime(this.currentDate.subtract(1, 'year').endOf('year'));
        minLimit = this.minTime(this.currentDate.subtract(1, 'year').startOf('year'));
      } else if (this.direction === NavigationDirection.NEXT) {
        maxLimit = this.maxTime(this.currentDate.add(1, 'year').endOf('year'));
        minLimit = this.minTime(this.currentDate.add(1, 'year').startOf('year'));
      }
    } else if (this.viewType === ViewTypes.SCHEDULE) {
      maxLimit = moment().add(1, 'day');
      minLimit = moment();

    }

    return {
      timeMax: maxLimit.toISOString(),
      timeMin: minLimit.toISOString(),
    };
  }

}
