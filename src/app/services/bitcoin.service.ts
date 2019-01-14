import axios from 'axios'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor() { }
  _getRequest(url) {
       return axios.get(url)
           .then(res => res.data)
    }

  getBitcoinRate(dollars=1)  {
    return this._getRequest(`https://blockchain.info/tobtc?currency=USD&value=${dollars}`)
  }


  async getMarketPrice() {
      const res = await this._getRequest('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
      return {
          title: res.name,
          data: res.values.map(point => point.y),
          description: res.description
      }
  }

  async  getConfirmedTransactions () {
      const res = await this._getRequest('https://api.blockchain.info/charts/n-transactions?format=json&cors=true')
      return {
          title: res.name,
          data: res.values.map(point => point.y),
          description: res.description
      }
  }

  lastRate = null;
  watchBitcoinRate(cb) {
      const getRate = async ()=>{
          let rate = await this.getBitcoinRate(1)
          if (rate === this.lastRate) return;
          rate = rate.toFixed(8)

          cb(+rate,+this.lastRate)
          this.lastRate = rate;
      }
      // Kick it off immediately and then every 4 secs
      getRate();
      var interval = setInterval(getRate, 1000)
      return ()=>clearInterval(interval)
  }


}

