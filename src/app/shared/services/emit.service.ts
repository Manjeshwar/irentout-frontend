import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitService {

  message:string = 'default title';
  emptyFilterSelection = false;
  cityChange = false;

  private messageservice = new BehaviorSubject(this.message);
  currentMessage = this.messageservice.asObservable();

  private emptyFilterService = new BehaviorSubject(this.emptyFilterSelection);
  currentFilter = this.emptyFilterService.asObservable();

  private emptyCityService = new BehaviorSubject(this.cityChange);
  cityFilter = this.emptyCityService.asObservable();

  constructor() { }

  changeTitle(title: string) {
    this.messageservice.next(title);
  }

  emptyCurrentSelection(bool) {
    this.emptyFilterService.next(bool);
  }

  changeCitySelection(city) {
    this.emptyCityService.next(city);
  }
}
