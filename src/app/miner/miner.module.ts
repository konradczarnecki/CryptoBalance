import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinerComponent } from './component/miner.component';
import { MinerService} from "./service/miner.service";
import { MatSliderModule } from '@angular/material'
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
    MatSliderModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports: [MinerComponent],
  declarations: [MinerComponent],
  providers: [MinerService]
})
export class MinerModule { }
