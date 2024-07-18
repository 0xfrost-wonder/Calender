import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginPersistanceService } from '../login-persistance.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventProviderService } from '../event-provider.service';

@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.sass']
})
export class GoogleSigninComponent implements OnInit {

  user = null;
  loggedIn: boolean;
  scopes: string[] = ['https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events'];

  constructor(
    private loginPersistanceService: LoginPersistanceService,
    private eventProviderService: EventProviderService,
    // tslint:disable-next-line: variable-name
    private _snackBar: MatSnackBar,
  ) { }

  signIn = () => {
    this.showSnackbar('Please authenticate in the Google Popup...');
    this.eventProviderService.signIn();
  }

  logout = () => {
    this.eventProviderService.signOut();
    // Display the toast message
    this.showSnackbar('You have been logged out.');
    // remove the item from storage
    this.loginPersistanceService.removeLogin();
    this.loggedIn = false;
  }

  private onSigninComplete = userProfileData => {
    this.loggedIn = true;
    this.user = userProfileData;
    setTimeout(() => {
      this.showSnackbar(`Hi ${this.user.name} !`);
    }, 1000);
    this.loginPersistanceService.persistLogin(this.user);
  }

  private showSnackbar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      politeness: 'assertive',
      panelClass: ['warning', 'mat-toolbar']
    });
  }

  ngOnInit() {
    // Sign in notifier...
    this.eventProviderService.signinComplete$.subscribe(userProfileData => {
      this.onSigninComplete(userProfileData);
    });
    const loggedInUser = JSON.parse(this.loginPersistanceService.isUserLoggedIn());
    if (loggedInUser !== null) {
      // this.eventProviderService.isAuthorized = true;
      this.user = loggedInUser;
      this.loggedIn = true;
    } else {
    }
  }
}
