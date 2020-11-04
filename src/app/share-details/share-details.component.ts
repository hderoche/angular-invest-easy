import { ProductService } from './../product.service';
import { Component, Input, OnInit } from '@angular/core';
import { Share } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-share-details',
  templateUrl: './share-details.component.html',
  styleUrls: ['./share-details.component.sass']
})
export class ShareDetailsComponent implements OnInit {

  chart = [];
  currentShare: Share;
  constructor(private productRest: ProductService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.currentShare = history.state;
    if (typeof(history.state) === 'object' ) {
      this.route.params.subscribe(param => {
        this.productRest.getOneShare$({ticker: param.ticker}).subscribe(share => {
          this.currentShare = new Share(share);
        });
      });
      this.generateChart();
    }
  }

  generateChart(): void {
    const weatherDates = [2, 3, 5, 6, 7, 10];
    // tslint:disable-next-line: variable-name
    const temp_max = [2, 7, 5, 10, 2, 5];
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: weatherDates,
        datasets: [
          {
            data: temp_max,
            borderColor: '#3cba9f',
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
              gridLines: {
                  color: 'rgba(0, 0, 0, 0)',
              }
          }],
          yAxes: [{
              gridLines: {
                  color: 'rgba(0, 0, 0, 0)',
              },
          }],
      },
    }});
  }

    // fetch market data history from server
    // fetch details about the share

  }
