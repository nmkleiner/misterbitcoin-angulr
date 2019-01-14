import { Component, OnInit } from '@angular/core';
import { BitcoinService } from '../../services/bitcoin.service';
@Component({
  selector: 'app-statistic-page',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div class="statistic-page">
         <ul>
         <!-- *ngFor="let item of data; let i = index" -->
            <li *ngFor="let chart of chartsData; let i = index" class="statistic-chart">
              <!-- {this.renderChart(chart, colors[idx])} -->
            <app-chart [title]="chart.title"
              [data]="chartsData[0].data"
              [description]="chart.description"
              [color]="colors[i]" ></app-chart>
            </li>

        </ul>
      </div>
    `,
  styles: []
})
export class StatisticPageComponent implements OnInit {

  chartsData: [any,any] = ['','']
  loading = true
  colors = ['blue', 'green']

  constructor(private bitcoinService: BitcoinService) { }

  async ngOnInit() {
    this.loading = true

    this.chartsData = await Promise.all([
      this.bitcoinService.getMarketPrice(),
      this.bitcoinService.getConfirmedTransactions()
    ])
    console.log(this.chartsData[0])
    this.loading = false
  }

}



// import Chart from '../../cmps/Chart';
// import bitcoinService from '../../services/bitcoinService'


// class StatisticPage extends Component {


//   renderChart(chart, color) {
//     const {title, data, description} = chart
//         <Chart title={title}
//               data={data}
//               description={description}
//               color={color} />

// //     return (
//     )
//   }

//   render() {
//     if (this.state.loading) return <div>Loading...</div>

//     const colors = ['blue', 'green']
//     return (
      // <div className="statistic-page">
      //    <ul>
      //   {
      //     this.state.chartsData.map( (chart, idx) =>
      //       <li className="statistic-chart" key={idx}>{this.renderChart(chart, colors[idx])}</li>
      //     )
      //   }
      //   </ul>
      // </div>
//     );
//   }
// }

