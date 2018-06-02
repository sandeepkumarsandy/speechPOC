import { Component, OnInit } from '@angular/core';
import { SpeechService } from '../speech.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-locationlist',
  templateUrl: './locationlist.component.html',
  styleUrls: ['./locationlist.component.css']
})
export class LocationlistComponent implements OnInit {

  public list = [{reference: 'WIN001', address: '500 Strawberry hill, Newbury, West berkshire'},
{reference: 'WIN001BLK', address: 'Communal block, Strawberry hill, Newbury, West berkshire'},
{reference: 'WIN001GRP', address: 'Strawberry hill, Newbury, West berkshire RG141XJ'}];

public clickedRow;

  constructor(public speech: SpeechService, public router: Router) { }

  ngOnInit() {
    this.speech.init();
    this.listenSelection();
    this.listenNav();
  }

  listenSelection() {
    this.speech.rowSelection.subscribe((val) => {
      if (val === 'first') {
        this.clickedRow = 0;
        this.speech.setLoc(this.list[0]);
      }
    });
  }
  listenNav() {
    this.speech.navtoForm.subscribe( (val) => {
      this.router.navigate(['']);
    });
  }
}
