import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

import {SharedDataAndFunctionsService} from '../shared/shared-data-and-functions.service';

@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.css']
})
export class MyPollsComponent implements OnInit {
  polls: {key: string, topic: string}[];
  constructor(
      private shareData: SharedDataAndFunctionsService,
      private router: Router) {
    this.polls = this.shareData.userProfile.polls;

    this.shareData.items.subscribe((value) => {

      for (const key in value.polls) {
        if (value.polls.hasOwnProperty(key)) {
          const val = value.polls[key];
          console.log(typeof val);
          console.log(val);

          this.polls.push(val);
        }
      }
      console.log(this.polls);
    });
  }

  ngOnInit() {}

  showResults(key: string) { this.router.navigate(['results', key]); }
}
