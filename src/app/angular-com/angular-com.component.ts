import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {SharedDataAndFunctionsService} from '../shared/shared-data-and-functions.service';

@Component({
  selector: 'app-angular-com',
  templateUrl: './angular-com.component.html',
})
export class AngularComComponent implements OnInit {
  itemRef: AngularFireObject<any>;
  items: Observable<any>;
  mydata: any;
  counter: number = 0;
  options: {choice: String; votes: Number}[] = [
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
      private db: AngularFireDatabase,
      private sharedData: SharedDataAndFunctionsService) {
    this.itemRef = db.object('/users/' + this.sharedData.userId + '/');
    this.items = this.itemRef.valueChanges();
    this.items.subscribe(om => {
      console.log(om);
      this.mydata = om;
    });
  }
  ngOnInit() {}

  save(newName: string) {
    this.itemRef.set({name: newName, love: {s: 'om', l: 'om'}});
  }
  update(newSize: string) {
    this.itemRef =
        this.db.object('/users/' + this.sharedData.userId + '/' + this.counter);
    this.options[9].votes = 42;
    this.itemRef.update({poll: {options: this.options}});
    this.counter++;
  }
}
