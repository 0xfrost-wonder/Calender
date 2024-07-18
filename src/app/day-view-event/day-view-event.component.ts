import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day-view-event',
  templateUrl: './day-view-event.component.html',
  styleUrls: ['./day-view-event.component.sass']
})
export class DayViewEventComponent implements OnInit {

  @Input() startTime: string;
  @Input() endTime: string;
  @Input() eventName: string;

  percPerMin: number;
  pixelsPerMin: number;
  top = 0;
  height = 0;

  constructor() {
    this.pixelsPerMin = 5.0 / parseFloat('6');
  }

  ngOnInit(): void {
    this.getDimensions();
  }

  private getTotalMinutes(timeStr: string): number {
    const timeNum = timeStr.split(':').map(Number);
    return timeNum[0] * 60 + timeNum[1];
  }

  getEventStyles() {
    const retVal = {
      top: `${this.top}px`,
      left: '100px',
      height: `${this.height}px`
    };
    return retVal;
  }

  private getDimensions(): void {
    this.top = this.getTotalMinutes(this.startTime) * this.pixelsPerMin;
    this.height = Math.abs(this.top - this.getTotalMinutes(this.endTime) * this.pixelsPerMin);
  }

}
