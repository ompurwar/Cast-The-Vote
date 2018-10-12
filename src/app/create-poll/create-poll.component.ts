import {Component, isDevMode, NgModule, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';

import {Option, Poll} from '../shared/options';
import {RequestService} from '../shared/request.service';
import {SharedDataAndFunctionsService} from '../shared/shared-data-and-functions.service';



@Component({
  selector: 'app-cast-vote',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  title = 'cast-the-vote-frontend';
  name = '';
  topic = '';
  shareAbleLink = '';
  linkGenerated: Boolean = false;
  mode: 'creater'|'caster' = 'creater';
  options: Option = [];
  editOptions: Boolean = false;
  poll: Poll;
  topicAdded: Boolean = false;
  /**
   *to keep track of option being added
   *
   * @type {string}
   * @memberof CreatePollComponent
   */
  choice: string;
  hardOptions: Option = [
    {choice: 'Pagal frnd 😝 ', votes: 0}, {choice: 'Sweet frnd 😋', votes: 0},
    {choice: 'Funny frnd 😆', votes: 0},
    {choice: 'Khatarnak frnd 😈 👿', votes: 0},
    {choice: 'Lovely frnd 😍', votes: 0},
    {choice: 'Mosum wala frnd 🌂', votes: 0},
    {choice: 'kamina wala frnd 😒', votes: 0},
    {choice: 'Harami Dost 😏', votes: 0}, {choice: 'Cute frnd 👻', votes: 0},
    {choice: 'Sweetheart 😘', votes: 0}
  ];

  constructor(
      private fireBaseReq: RequestService,
      public sharedData: SharedDataAndFunctionsService,
      private db: AngularFireDatabase) {
    console.log('createPoll');
    this.sharedData.userProfile = {name: '', NoOfPolls: 0, polls: []};
  }

  ngOnInit() {}
  /**
     * createLink
     */
  public createLink() {
    // this.getUrlVars();
    console.log('create link');
    this.poll = {count: 0, topic: '', options: []};
    this.poll.count = 0;
    this.poll.topic = this.topic;
    this.poll.options = this.options;


    let key = '';
    this.db.list('/polls').push(this.poll).then((val) => {
      // tslint:disable-next-line:no-construct
      const a: String = new String(val);
      const i: number = a.lastIndexOf('/');
      // tslint:disable-next-line:no-construct
      key = a.substr(i + 1, a.length);
      this.createShareableLink(key);
      this.sharedData.tempSharableLink = this.shareAbleLink;

      this.db.list('/users/' + this.sharedData.userId + '/polls')
          .push({key: key, topic: this.topic})
          .then((value: string) => {
            console.log('key inserted to the polls array of user\t:' + value);
          });

      this.linkGenerated = true;
    });
  }



  createOption(numberofOptions): void {
    console.log(numberofOptions);
    for (let i = 0; i < numberofOptions; ++i) {
      this.options.push({choice: this.choice, votes: 0});
    }
  }
  createShareableLink(key) {
    if (isDevMode()) {
      this.shareAbleLink =
          'http://' + window.location.host + '/castvote/' + key;
    } else {
      this.shareAbleLink =
          'https://' + window.location.host + '/castvote/' + key;
    }
  }
}
