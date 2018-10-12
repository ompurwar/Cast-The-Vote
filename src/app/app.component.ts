import {Component, NgModule, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {SharedDataAndFunctionsService} from './shared/shared-data-and-functions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@NgModule()

export class AppComponent implements OnInit {
  private localStorageKey =
      'skdjflsjldfjlsjiw4enskidjiofs234r03924090oijorfwoe';
  title = 'Cast The Vote';
  constructor(
      private db: AngularFireDatabase,
      private sharedData: SharedDataAndFunctionsService) {
    console.log('Appcomponent');
  }

  ngOnInit() {
    if (!window.localStorage.getItem(this.localStorageKey)) {
      console.log('already not there');

      this.db.list('/users').push({name: ''}).then((val) => {
        // tslint:disable-next-line:no-construct
        const a: String = new String(val);
        const i: number = a.lastIndexOf('/');
        // tslint:disable-next-line:no-construct
        const key = a.substr(i + 1, a.length);
        console.log('from shared data service');
        window.localStorage.setItem(this.localStorageKey, key);
        this.sharedData.userId = String(key);
      });
    } else {
      console.log('already there');
    }
  }
}
