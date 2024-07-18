import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day-time-slot',
  templateUrl: './day-time-slot.component.html',
  styleUrls: ['./day-time-slot.component.sass']
})
export class DayTimeSlotComponent implements OnInit {

  @Input() start: string = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
