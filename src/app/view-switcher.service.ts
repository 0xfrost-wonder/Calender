import { Injectable } from '@angular/core';
import { ViewTypes } from 'src/config/view-type';

@Injectable({
  providedIn: 'root'
})
export class ViewSwitcherService {

  currentView: ViewTypes = ViewTypes.DAY;

  constructor() { }

  setCurrentView(view: ViewTypes) {
    this.currentView = view;
  }

}
