import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Options } from 'ng5-slider';
// import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PriceComponent implements OnInit {

  value: number = 5;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      {value: 3},
      {value: 6},
      {value: 9},
      {value: 12},
      {value:18},
      {value:24},
    ]
  };

  // Using Output EventEmitter
  @Output() priceFilters = new EventEmitter();
  togglePM:boolean;
    
  // define min, max and range
  public min : number = 100;
  public max : number = 10000;
  public range = [100, 10000];

  constructor() { }

  ngOnInit() {  }

  // rangeChanged
  priceChanged(event:any) {
    setInterval(() => {
      this.priceFilters.emit(event);
    }, 1000);
  }

}
