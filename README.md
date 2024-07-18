# A Calendar along the lines of Google Calendar.

This project is based on Angular 9 because I've done enough projects in React. This DOES not intend to copy Google calendar completely, rather, it tries to Emulate it.

## Integrations:

Uses Google APIs (OAuth2 with Gapi to make things a bit easy). A better way would've been to write `Firebase Cloud Functions` and abstract the Gory integration stuff there, but I am lazy. Plus, it would've been another project to take care of !

## Want to Contribute ?

1. Clone the project.
2. npm install ( I prefer `yarn` but **@angular/material doesn't work well with it**, in that the scaffolding is not as expected. )
3. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
4. For a list of Issues / Features, check the Issues section.

## IMPORTANT
You will need to Authorize the app with Google such that it can access your Calendar and Events.


## Further help

Shoot a mail to `ccsCoder@gmail.com` if you need more help.
