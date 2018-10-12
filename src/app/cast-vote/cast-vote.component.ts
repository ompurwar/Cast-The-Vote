
import {Component, OnInit} from '@angular/core';

import {Response} from '@angular/http';
import {ActivatedRoute, Params} from '@angular/router';
import {RequestService} from '../shared/request.service';

@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.css']
})
export class CastVoteComponent implements OnInit {
  private pollId = '';
  vote: Boolean[] = [];
  poll = {count: 0, name: '', topic: '', options: []};
  alreadyVoted: Boolean = false;
  constructor(
      private activatedRoute: ActivatedRoute,
      private fireBaseReq: RequestService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((value: Params) => {
      this.pollId = value['id'];
      if (!window.localStorage.getItem(this.pollId) ||
          window.localStorage.getItem(this.pollId) === 'false') {
        console.log('not casted yet');
        console.log(this.pollId);
        this.getUser();
        window.localStorage.setItem(this.pollId, 'false');
      } else if (window.localStorage.getItem(this.pollId) === 'true') {
        this.alreadyVoted = true;
      }
    });
  }
  public getUser() {
    this.fireBaseReq
        .createHttpReq('GET', null, '/polls/' + this.pollId + '.json')
        .subscribe((res: Response) => {
          this.poll = res.json();
          console.log(this.poll);
          this.poll.options.forEach((elementVal) => {
            this.vote.push(false);
            console.log(elementVal);
          });
        });
  }


  public castVote(index: number) {
    console.log('before' + this.vote[index]);
    this.vote[index] = !this.vote[index];
    console.log('after' + this.vote[index]);
  }

  public updateVote() {
    this.vote.forEach((elementVal, index) => {
      console.log('before ' + this.poll.options[index].votes);
      this.poll.options[index].votes += (1 * (elementVal ? 1 : 0));
      console.log('before ' + this.poll.options[index].votes);
    });
    console.log(this.poll.options);
    this.fireBaseReq
        .createHttpReq(
            'PATCH', {count: this.poll.count + 1, options: this.poll.options},
            '/polls/' + this.pollId + '/.json')
        .subscribe(
            (res: Response) => {
              console.log(res);
              this.alreadyVoted = true;
              window.localStorage.setItem(this.pollId, 'true');
            },
            (err: Error) => { console.log(err); });
  }
}
