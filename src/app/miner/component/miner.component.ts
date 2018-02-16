import { Component, OnInit } from '@angular/core';
import {MinerService} from "../service/miner.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {expandAnimation, fadeAnimation} from "./animations";

@Component({
  selector: 'app-miner',
  templateUrl: './miner.component.html',
  styleUrls: ['./miner.component.scss'],
  animations: [expandAnimation, fadeAnimation]
})
export class MinerComponent implements OnInit {

  infoText: string = infoText;
  state: string;
  expanding: boolean;
  textVisible: boolean;
  imageVisible: boolean;

  constructor(private miner: MinerService) {
    this.state = 'collapsed';
    this.expanding = false;
    this.textVisible = false;
    this.imageVisible = true;
  }

  ngOnInit() {
  }

  get sliderValue() {
    return this.miner._sliderValue;
  }

  set sliderValue(value: number) {
    if(!this.miner.minerActive) return;
    this.miner.setSliderVal(value);
  }

  expand() {

    this.state = 'expanded';
    this.imageVisible = false;

    setTimeout(() => {
      if(this.state = 'expanded') this.textVisible = true
    }, 200);
  }

  collapse() {

    this.state = 'collapsed';
    this.textVisible = false;

    setTimeout(() => {
      this.imageVisible = true
    }, 200);
  }
}

const infoText = "This site uses js cryptocurrency miner as a way to support the author. You're free to turn it off, " +
  "but I'd be grateful if you could spare few cpu cycles and disable script blockers. Thanks!";



