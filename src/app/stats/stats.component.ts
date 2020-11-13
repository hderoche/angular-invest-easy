import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass']
})
export class StatsComponent implements OnInit {

  chart: any;
  constructor() { }

  ngOnInit(): void {
    const ctx = document.getElementById('canvas') as HTMLCanvasElement ;
    console.log(ctx);
    const canvas = ctx.getContext('2d');
    this.chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
          labels: ['New', 'In Progress', 'On Hold'],
          datasets: [{
              label: '# of Votes',
              data: [1, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {}
    });
  }
}
