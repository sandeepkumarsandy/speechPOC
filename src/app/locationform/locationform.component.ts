import { Component, OnInit, Injectable, NgZone } from '@angular/core';
import { SpeechService } from '../speech.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-locationform',
  templateUrl: './locationform.component.html',
  styleUrls: ['./locationform.component.css']
})
export class LocationformComponent implements OnInit {

  // TypeScript declaration for annyang
public name1: any;
public name2: any;
public location: any;

  constructor(public speech: SpeechService, private router: Router) { }

  ngOnInit() {
    if (this.speech.getLoc()) {
      this.location = `${this.speech.getLoc().reference} - ${this.speech.getLoc().address}`;
    }
    if (this.speech.getData()) {
      this.name1 = this.speech.getData()['name1'];
      this.name2 = this.speech.getData()['name2'];
    }
    this.speech.init();
    this.listenFirstName();
    this.listenLastName();
    this.locationSearch();
    this.submit();
  }

  startListening() {
    this.speech.listenStart();
  }

  stopListening() {
    this.speech.listenStop();
  }

  listenFirstName() {
    this.speech.firstName.subscribe( (val) => {
      this.name1 = val;
    });
  }

  listenLastName() {
    this.speech.lastName.subscribe( (val) => {
      this.name2 = val;
    });
  }

  locationSearch() {
    this.speech.searchLocation.subscribe( (val) => {
      if (val === 'list') {
        this.speech.setdata({name1: this.name1, name2: this.name2});
      this.router.navigate(['locationlist']);
    }
  });
  }

  submit() {
    this.speech.submit.subscribe(() => {
      alert('Form Submitted Successfully');
    });
  }
}
