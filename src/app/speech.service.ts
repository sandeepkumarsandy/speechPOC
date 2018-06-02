import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

// TypeScript declaration for annyang
declare var annyang: any;

@Injectable()
export class SpeechService {

  public firstName = new Subject();
  public lastName = new Subject();
  public searchLocation = new Subject();
  public rowSelection = new Subject();
  public navtoForm = new Subject();
  public submit = new Subject();
  public locationDetails;
  public formData = {};

  constructor(public zone: NgZone) { }

  get speechSupported(): boolean {
    return !!annyang;
  }

  init() {
    const commands = {
      'last name :lastname': (lastname) => {
        this.zone.run(() => {
          this.lastName.next(lastname);
        });
      },
      'first name :firstname': (firstname) => {
        this.zone.run(() => {
          this.firstName.next(firstname);
        });
      },
      'submit': () => {
        this.submit.next(true);
      },
      'search location :locsearch': (locsearch) => {
        this.zone.run(() => {
          this.searchLocation.next(locsearch);
        });
      },
      'select row :listval': (listval) => {
        this.zone.run(() => {
          this.rowSelection.next(listval);
        });
      },
      'go back :form': (form) => {
        this.zone.run(() => {
          this.navtoForm.next(form);
        });
      }

    };

    annyang.addCommands(commands);
    annyang.addCallback('error', function() {
      console.log('speech not recognised');
    });

    annyang.addCallback('errorNetwork', (err) => {
      this._handleError('network', 'A network error occurred.', err);
    });
    annyang.addCallback('errorPermissionBlocked', (err) => {
      this._handleError('blocked', 'Browser blocked microphone permissions.', err);
    });
    annyang.addCallback('errorPermissionDenied', (err) => {
      this._handleError('denied', 'User denied microphone permissions.', err);
    });
    annyang.addCallback('resultNoMatch', (userSaid) => {
      this._handleError(
        'no match',
        'Spoken command not recognized. Say "noun [word]", "verb [word]", OR "adjective [word]".',
        { results: userSaid });
    });

  }

  public _handleError(error, msg, errObj) {
    console.log(msg);
  }

  listenStart() {
    annyang.start();
  }

  listenStop() {
    annyang.abort();
  }
public setLoc(data) {
this.locationDetails = data;
}
public getLoc() {
  return this.locationDetails;
}
public setdata(data) {
  this.formData = data;
}
public getData() {
  return this.formData;
}
}
