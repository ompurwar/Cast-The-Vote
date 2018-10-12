import {Component, isDevMode, OnInit} from '@angular/core';

import {SharedDataAndFunctionsService} from '../../shared/shared-data-and-functions.service';

@Component({
  selector: 'app-copy-link',
  templateUrl: './copy-link.component.html',
  styleUrls: ['./copy-link.component.css']
})
export class CopyLinkComponent implements OnInit {
  shareAbleLink = '';
  copied = false;
  btnDisplayText = 'Copy';
  constructor(public sharedData: SharedDataAndFunctionsService) {}

  ngOnInit() {}
  /**
     * FUnctionto copy link
     *
     * @param {*} inputElement
     * @memberof CreatePollComponent
     */
  onClickCopy(inputElement): void {
    inputElement.select();
    console.log(typeof inputElement);
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.copied = true;
    this.btnDisplayText = 'Copied!';
  }
}
