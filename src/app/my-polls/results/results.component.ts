import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {Chart} from 'chart.js';

import {Poll} from '../../shared/options';
import {SharedDataAndFunctionsService} from '../../shared/shared-data-and-functions.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements AfterViewInit, OnInit {
  chart: Chart;
  cardTitle: 'Doughnut Chart'|'Bar Chart' = 'Doughnut Chart';
  canvas: any;
  ctx: any;
  toggleDoughnut: Boolean = true;
  toggleBar: Boolean = false;
  sharedLink: String = '';
  btnTitle: 'Doughnut Chart'|'Bar Chart' = 'Bar Chart';

  poll: {topic: string,
         count: number,
         options: string[],
         votes: number[]} = {count: 0, topic: '', options: [], votes: []};


  constructor(
      private sharedData: SharedDataAndFunctionsService,
      private route: ActivatedRoute, private db: AngularFireDatabase) {}

  ngAfterViewInit() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.plotGraph();
  }

  ngOnInit() {
    const urlPrams = this.route.snapshot.params['id'];
    this.db.object('/polls/' + urlPrams + '/')
        .valueChanges()
        .subscribe((poll: Poll) => {
          console.log(poll);
          this.poll.count = poll.count;
          this.poll.topic = poll.topic;
          poll.options.forEach((element, index) => {
            this.poll.options[index] = element.choice;
            this.poll.votes[index] = element.votes;
          });
          this.plotGraph();
        });
  }


  /**
 * A function to toggle charts
 *
 * @memberof ResultsComponent
 */
  public toggleCharts() {
    this.toggleDoughnut = !this.toggleDoughnut;
    this.toggleBar = !this.toggleBar;
    /*-------------Logic to toggle card title----------------------*/
    this.cardTitle = this.toggleDoughnut ? 'Doughnut Chart' : 'Bar Chart';
    this.btnTitle = this.toggleDoughnut ? 'Bar Chart' : 'Doughnut Chart';
    this.plotGraph();
  }

  /**
   * A function to plot graph
   *
   * @private
   * @memberof ResultsComponent
   */
  private plotGraph() {
    this.chart = new Chart(this.ctx, {
      type: (this.toggleDoughnut ? 'doughnut' : 'bar'),
      data: {
        labels: this.poll.options,
        datasets: [{
          label: '# of Votes',
          data: this.poll.votes,
          backgroundColor: [
            'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {position: (this.toggleDoughnut ? 'right' : 'top')},
        responsive: true,
        layout: {padding: {left: 20, right: 10, top: 25, bottom: 1}}
      }
    });
  }
  onShare() {
   window.location.assign('https://wa.me/?text=I\'m%20inquiring%20about%20the%20apartment%20listing');
  }
}
