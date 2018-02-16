import { Injectable } from '@angular/core';
declare var System: any;
declare var miner: any;
declare var CoinHive: any;

@Injectable()
export class MinerService {

  miner: any;
  statistics: any;
  minerActive: boolean;
  _sliderValue: number;
  throttles: number[];

  constructor() {

    this.throttles = [0, 1, 0.5, 0];

    this.statistics = {
      hashesPerSecond: 0,
      totalHashes: 0,
      acceptedHashes: 0
    };

    this.readSliderVal();
    if(this._sliderValue != 0) this.startMining();
  }

  startMining() {

    try {
      this.miner = new CoinHive.Anonymous('4Q2BuYl2VldkJTZItAWVBboApwvRroll', { throttle: this.throttles[this._sliderValue] });
      this.miner.start();
      this.updateStatistics();
      this.minerActive = true;

    } catch(error) {
      this.minerActive = false;
      this._sliderValue = 0;
    }
  }

  updateStatistics() {
    setTimeout(() => {
      this.statistics.hashesPerSecond = this.miner.getHashesPerSecond();
      this.statistics.totalHashes = this.miner.getTotalHashes();
      this.statistics.acceptedHashes = this.miner.getAcceptedHashes();
      this.updateStatistics();
      console.log(this.statistics.hashesPerSecond);
    }, 1000);
  }

  setSliderVal(value: number) {
    this._sliderValue = value;
    this.saveSliderVal();
    this.miner.stop();
    if(value != 0) this.startMining();
  }

  readSliderVal() {

    let fromStorage = Number(localStorage.getItem('minerSlider'));
    if(fromStorage != null) this._sliderValue = fromStorage;
    else this._sliderValue = 2;
  }

  saveSliderVal() {

    localStorage.setItem('minerSlider', String(this._sliderValue));
  }
}
