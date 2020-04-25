import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { ProductsService } from '../../../../shared/services/products.service';
import { Router } from '@angular/router';
import { EmitService } from '../../../../shared/services/emit.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories = [];
  uniqCategories = [];

  constructor(private ps: ProductsService, private router: Router, private emitS: EmitService) { }
  
  // collapse toggle
  ngOnInit() {
    this.fetchAllCategories();
    $('.collapse-block-title').on('click', function(e) {
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

  // For mobile view
  public mobileFilterBack() {
     $('.collection-filter').css("left", "-365px");
  }

  fetchAllCategories() {
    this.ps.getProducts().subscribe((res) => {
      res.forEach((dta) => {
        this.categories.push(dta.cat_name);
      });
      const categories = Array.from(new Set(this.categories));
      categories.forEach((res) => {
        this.uniqCategories.push({'href': `/categories/${res}`, 'name': res});
      });

    });
  }

  changeCategory(route) {
    // location.replace(`http://localhost:4200${route}`);
    this.emitS.emptyCurrentSelection(true);
    this.router.navigate([route]);
  }


}
