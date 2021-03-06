import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var $: any;
import { EmitService } from '../../../../shared/services/emit.service';

@Component({
  selector: 'app-resolution',
  templateUrl: './resolution.component.html',
  styleUrls: ['./resolution.component.scss']
})
export class ResolutionComponent implements OnInit {

  // Using Input nad Output EventEmitter
  @Input()  ramsFilters : any[] = [];
  @Output() ramFilters  : EventEmitter<any[]> = new EventEmitter<any[]>();
  togglePM:boolean;
  
  // Array
  public checkedTagsArray: any[] = [];

  constructor(private emitS: EmitService) { }

  ngOnInit() {  
      this.ramFilters.emit(this.checkedTagsArray);   // Pass value Using emit 
      $('.collapse-block-title-ram').on('click', function(e) {
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
    this.emitS.currentFilter.subscribe(val => {
      if (val) {
        this.checkedTagsArray = [];
        this.ramFilters.emit(this.checkedTagsArray);
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
