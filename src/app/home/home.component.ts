import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/classes/product';
import { ProductsService } from '../shared/services/products.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: Product[] = [];
  
  constructor(private productsService: ProductsService) {   }

  ngOnInit() {
    $.getScript('assets/js/script.js');
  	this.productsService.getProducts().subscribe(product => { 
  	  product.filter((item: Product) => {
        //  if(item.cat_name == 'laptop')
         	this.products.push(item)
      })
    });
  }

}
