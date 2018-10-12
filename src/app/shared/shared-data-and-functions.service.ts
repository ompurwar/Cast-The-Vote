import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {browser} from 'protractor';
import {Observable} from 'rxjs';
import {UserProfile} from './options';

@Injectable({providedIn: 'root'})
export class SharedDataAndFunctionsService {
  /*----------centeral repository odf user created poll------*/
  /**
   * A property to keep userprofile ref
   *
   * @type {AngularFireObject<any>}
   * @memberof SharedDataAndFunctionsService
   */
  userProfileRef: AngularFireObject<any>;


  /**
   *
   *
   * @type {Observable<any>}
   * @memberof SharedDataAndFunctionsService
   */
  items: Observable<any>;


  /**
   *
   * A property to keep user id
   * @type {String}
   * @memberof SharedDataAndFunctionsService
   */
  userId: String = '';

  /**
   *
   *
   * @type {{
   *     name: String,
   *     polls: {
   *       count: Number,
   *       name: String,
   *       topic: String,
   *       options: {choice: String, votes: Number}[],
   *     }[]
   *   }}
   * @memberof SharedDataAndFunctionsService
   */
  public userProfile: UserProfile;
  private localStorageKey =
      'skdjflsjldfjlsjiw4enskidjiofs234r03924090oijorfwoe';
  public tempSharableLink = '';

  /**
   *Creates an instance of SharedDataAndFunctionsService.
   * @param {AngularFireDatabase} db
   * @memberof SharedDataAndFunctionsService
   */
  constructor(private db: AngularFireDatabase) {
    this.userProfile = {name: '', NoOfPolls: 0, polls: []};
    console.log('sharedservice');
    console.log(this.userId);
    console.log(window.localStorage.getItem(this.localStorageKey));
    if (!window.localStorage.getItem(this.localStorageKey)) {
      db.list('/users').push({}).then(
          (val) => { console.log('from shared data service' + val); });
    }
    this.userId = window.localStorage.getItem(this.localStorageKey);
    this.userProfileRef = db.object('/users/' + this.userId + '/');
    this.items = this.userProfileRef.valueChanges();
    this.items.subscribe(Profile => {
      console.log(Profile);
      this.userProfile.name = Profile.name;
      this.userProfile.NoOfPolls = Profile.NoOfPolls;
      this.userProfile.polls = [];
      // tslint:disable-next-line:forin
      for (const key in Profile.polls) {
        if (Profile.polls.hasOwnProperty(key)) {
          const val = Profile.polls[key];
          this.userProfile.polls.push(val);
        }
      }
      console.log(this.userProfile.polls);
      console.log(this.userProfile);
      console.log(typeof this.userProfile.polls);
      // this.userProfile.polls = om
    });
  }

  /**
   * A function to get url prams
   *
   * @param {Boolean} hashBased
   * @param {String} url
   * @returns {} result
   * @memberof SharedDataAndFunctionsService
   */
  getJsonFromUrl(hashBased: Boolean, url: String) {
    let query;
    if (hashBased) {
      const pos = url.indexOf('?');
      if (pos === -1) {
        return [];
      }
      query = url.substr(pos + 1);
    }
    const result = {};
    query.split('&').forEach(function(part) {
      if (!part) {
        return;
      }
      part = part.split('+').join(
          ' ');  // replace every + with space, regexp-free version
      const eq = part.indexOf('=');
      let key = eq > -1 ? part.substr(0, eq) : part;
      const val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : '';
      const from = key.indexOf('[');
      if (from === -1) {
        result[decodeURIComponent(key)] = val;
      } else {
        const to = key.indexOf(']', from);
        const index = decodeURIComponent(key.substring(from + 1, to));
        key = decodeURIComponent(key.substring(0, from));
        if (!result[key]) {
          result[key] = [];
        }
        if (!index) {
          result[key].push(val);
        } else {
          result[key][index] = val;
        }
      }
    });
    return result;
  }

  pushData() {
    this.db.list('/users').push({name: ''}).then((val) => {
      // tslint:disable-next-line:no-construct
      const a: String = new String(val);
      const i: number = a.lastIndexOf('/');
      // tslint:disable-next-line:no-construct
      const key = a.substr(i + 1, a.length);

    });
  }
}
