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
    if(this.miner) this.miner.stop();
    if(value != 0) this.startMining();
  }

  readSliderVal() {

    let fromStorage = localStorage.getItem('minerSlider');
    let numberVal = Number(fromStorage);
    console.log(fromStorage);
    if(fromStorage == null || fromStorage == undefined) this.setSliderVal(2);
    else this.setSliderVal(numberVal);
  }

  saveSliderVal() {

    localStorage.setItem('minerSlider', String(this._sliderValue));
  }
}
