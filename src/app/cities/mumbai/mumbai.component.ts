import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/classes/product';
import { ProductsService } from '../../shared/services/products.service';
declare var $: any;

@Component({
  selector: 'app-mumbai',
  templateUrl: './mumbai.component.html',
  styleUrls: ['./mumbai.component.scss']
})
export class MumbaiComponent implements OnInit {

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
