import { Component, OnInit } from '@angular/core';
import {coverAnimation} from "../animations";

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss'],
  animations: [coverAnimation]
})
export class CoverComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
