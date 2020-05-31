import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection-banner',
  templateUrl: './collection-banner.component.html',
  styleUrls: ['./collection-banner.component.scss']
})
export class CollectionBannerComponent implements OnInit {

  cty: string;

  constructor() { }

  ngOnInit() {
    this.cty = localStorage.getItem('city') ? localStorage.getItem('city') : 'Bangalore';
  }

  // Collection banner
  public category = [{
    image: 'assets/images/furniture/2banner1.jpg',
    save: 'save 50%',
    title: 'Sofa',
    link: `category/Laptop`
  }, {
    image: 'assets/images/furniture/2banner2.jpg',
    save: 'save 50%',
    title: 'Bean Bag',
    link: `category/Laptop`
  },{
    image: 'assets/images/furniture/2banner3.jpg',
    save: 'save 50%',
    title: 'Chair',
    link: `category/Laptop`
  }]

}
