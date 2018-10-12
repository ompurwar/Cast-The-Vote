import {Injectable, isDevMode} from '@angular/core';
import { Http } from '@angular/http';

@Injectable({providedIn: 'root'})
export class RequestService {
  private XHost = 'https://cast-the-vote.firebaseio.com';
  private pHost = 'https://cast-the-vote.firebaseio.com';
  private host;

  constructor(private httpReq: Http) {
    console.log('req');
    if (isDevMode()) {
      this.host = this.XHost;
    } else {
      this.host = this.pHost;
    }
  }
  public createHttpReq(
      type: 'PUT'|'GET'|'POST'|'PATCH'|'DELETE'|'HEAD'|'OPTION', data,
      path) {
    const destination = this.host + path;
    if (type === 'PUT') {
      return this.httpReq.put(destination, data);
    }
    if (type === 'GET') {
      console.log(destination);
      return this.httpReq.get(destination);
    }
    if (type === 'POST') {
      return this.httpReq.post(destination, data);
    }
    if (type === 'PATCH') {
      return this.httpReq.patch(destination, data);
    }
  }
}
