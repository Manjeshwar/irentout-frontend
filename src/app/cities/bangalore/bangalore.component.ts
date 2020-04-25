import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/classes/product';
import { ProductsService } from '../../shared/services/products.service';
declare var $: any;

@Component({
  selector: 'app-bangalore',
  templateUrl: './bangalore.component.html',
  styleUrls: ['./bangalore.component.scss']
})
export class BangaloreComponent implements OnInit {

  public products: Product[] = [];
  
  constructor(private productsService: ProductsService) {   }

  ngOnInit() {
    $.getScript('assets/js/script.js');
  	this.productsService.getProducts().subscribe(product => { 
  	  product.filter((item: Product) => {
         if(item.category == 'furniture')
         	this.products.push(item)
      })
    });
  }

}
