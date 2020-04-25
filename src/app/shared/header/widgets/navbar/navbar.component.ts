import { Component, OnInit } from '@angular/core';
import { MENUITEMS, Menu } from './navbar-items';
import { EmitService } from 'src/app/shared/services/emit.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  public menuItems: Menu[];
  public toggleNavBar : boolean = false;

  constructor(private emitS: EmitService) { }

  ngOnInit() {
    this.emitS.cityFilter.subscribe(val => {
      if (val) {
        this.loadMenu(val);
      }
    });
    
  }

  loadMenu(city) {
  	this.menuItems = MENUITEMS.filter((menuItem) => {
      if(menuItem.city.includes(city)) {
        return true;
      }
    });
  }

  toggleNav() {
    this.toggleNavBar = !this.toggleNavBar
  }

}
