import { Component, OnInit } from '@angular/core';
import {donationExpand, donationOpacity} from '../animations';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss'],
  animations: [donationExpand, donationOpacity]
})
export class DonationComponent implements OnInit {

  expanded: string;
  classExpanded: boolean;
  accountsVisible: boolean;
  collapseTimeouts: number[];

  btcAddress: string;
  ethAddress: string;

  constructor() { }

  ngOnInit() {

    this.expanded = 'collapsed';
    this.accountsVisible = false;
    this.classExpanded = false;
    this.collapseTimeouts = [];
    this.btcAddress = environment.btcAddress;
    this.ethAddress = environment.ethAddress;
  }

  expand() {

    this.collapseTimeouts.forEach(timeout => clearTimeout(timeout));

    this.expanded = 'expanded';
    this.classExpanded = true;
    setTimeout(() => this.accountsVisible = true, 300);
  }

  collapse() {

    this.collapseTimeouts.push(window.setTimeout(() => this.accountsVisible = false, 2500));
    this.collapseTimeouts.push(window.setTimeout(() => this.expanded = 'collapsed', 2800));
    this.collapseTimeouts.push(window.setTimeout(() => this.classExpanded = false, 3200));
  }

}
