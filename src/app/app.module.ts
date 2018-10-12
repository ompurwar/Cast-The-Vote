import {Component, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {copyFile} from 'fs';

import {environment} from '../environments/environment';

import {AngularComComponent} from './angular-com/angular-com.component';
import {AppComponent} from './app.component';
import {CastVoteComponent} from './cast-vote/cast-vote.component';
import {ChartComponent} from './chart/chart.component';
import {CopyLinkComponent} from './create-poll/copy-link/copy-link.component';
import {CreatePollComponent} from './create-poll/create-poll.component';
import {DoneVotingComponent} from './done-voting/done-voting.component';
import {MyPollsComponent} from './my-polls/my-polls.component';
import {ResultsComponent} from './my-polls/results/results.component';
import {RequestService} from './shared/request.service';
import {SharedDataAndFunctionsService} from './shared/shared-data-and-functions.service';
import { ServiceWorkerModule } from '@angular/service-worker';

const appRoutes: Routes = [
  {path: '', component: DoneVotingComponent},
  {path: 'castvote/:id', component: CastVoteComponent},
  {path: 'createpoll', component: CreatePollComponent},
  {path: 'results/:id', component: ResultsComponent},
  {path: 'createpoll/copylink', component: CopyLinkComponent},
  {path: 'mypolls', component: MyPollsComponent}
];
@NgModule({
  declarations: [
    AppComponent, CreatePollComponent, CastVoteComponent, DoneVotingComponent,
    ResultsComponent, ChartComponent, AngularComComponent, CopyLinkComponent,
    MyPollsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [RequestService, SharedDataAndFunctionsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
