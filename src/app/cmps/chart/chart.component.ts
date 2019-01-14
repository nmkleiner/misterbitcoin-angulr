import { Component, OnInit,Input } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  template: `
    <div>
      <canvas id="chart"></canvas>
    </div>
  `,
  styles: []
})
export class ChartComponent implements OnInit {

  constructor() { }
  @Input() data = '';
  @Input() description = ''
  @Input() color = ''
  ngOnInit() {
    console.log('baba',this.data)
    // @ts-ignore
    const ctx = document.getElementById('chart').getContext('2d');
     const chart = new Chart(ctx, {
      type: 'line',

      data: {
        labels: [" ", " ", " ", " ", " ", " ", " "],
        datasets: [{
          label: "BTC/USD",
          // backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(100, 100, 255)',
          data: this.data,
        }]
      },
    })
  }


  }


//     // Configuration options go here
//     options: {}
// })
