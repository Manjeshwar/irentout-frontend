import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-processor',
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.scss']
})
export class ProcessorComponent implements OnInit {

  // Using Input nad Output EventEmitter
  @Input()  processorsHFilters : any[] = [];
  @Output() processorFilters  : EventEmitter<any[]> = new EventEmitter<any[]>();
  togglePM:boolean;
  
  // Array
  public checkedTagsArray: any[] = [];

  constructor() { }

  ngOnInit() {
      this.processorFilters.emit(this.checkedTagsArray);   // Pass value Using emit 
      $('.collapse-block-title-processor').on('click', function(e) {
        e.preventDefault;
        var speed = 300;
        var thisItem = $(this).parent(),
          nextLevel = $(this).next('.collection-collapse-block-content');
        if (thisItem.hasClass('open')) {
          thisItem.removeClass('open');
          nextLevel.slideUp(speed);
        } else {
          thisItem.addClass('open');
          nextLevel.slideDown(speed);
        }
    });
  }

  // value checked call this function
  checkedFilter(event) {
    const index = this.checkedTagsArray.indexOf(event.target.value);  // checked and unchecked value
    if (event.target.checked) {
      this.checkedTagsArray.push(event.target.value); // push in array cheked value
    } else {
      this.checkedTagsArray.splice(index, 1);  // removed in array unchecked value
    }
}
}
