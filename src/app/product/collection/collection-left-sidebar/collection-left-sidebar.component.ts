import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { trigger, transition, style, animate } from "@angular/animations";
import {
  Product,
  ColorFilter,
  TagFilter,
} from '../../../shared/classes/product';
import { ProductsService } from '../../../shared/services/products.service';
import * as _ from 'lodash';
import * as $ from 'jquery';

@Component({
  selector: 'app-collection-left-sidebar',
  templateUrl: './collection-left-sidebar.component.html',
  styleUrls: ['./collection-left-sidebar.component.scss'],
  animations: [
    // angular animation
    trigger('Animation', [
      transition('* => fadeOut', [
        style({ opacity: 0.1 }),
        animate(1000, style({ opacity: 0.1 })),
      ]),
      transition('* => fadeIn', [
        style({ opacity: 0.1 }),
        animate(1000, style({ opacity: 0.1 })),
      ]),
    ]),
  ],
})
export class CollectionLeftSidebarComponent implements OnInit, OnChanges {
  public products: Product[] = [];
  public items: Product[] = [];
  public allItems: Product[] = [];
  public colorFilters: ColorFilter[] = [];

  public tagsFilters: any[] = [];
  public tags: any[] = [];

  public ramsFilters: any[] = [];
  public rams: any[] = [];

  public capacityHFilters: any[] = [];
  public capacityH: any[] = [];

  public processorsHFilters: any[] = [];
  public processor: any[] = [];

  public storageHFilters: any[] = [];
  public storage: any[] = [];

  public colors: any[] = [];
  public sortByOrder: string = ''; // sorting
  public animation: any; // Animation

  category: string;

  lastKey = ''; // key to offset next query from
  finished = false; // boolean when end of data is reached

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.productsService
        .getProductByCategory(this.category)
        .subscribe((products) => {
          this.allItems = products; // all products
          this.products = products.slice(0, 8);
          this.getTags(products);
          this.getColors(products);
          this.getRams(products);
          this.getCapacity(products);
          this.getProcessor(products);
          this.getStorage(products);
        });

        this.category = this.category.toLowerCase();
    });
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  // Get current product tags
  // public getTags(products) {
  //   const uniqueBrands = [];
  //   const itemBrand = Array();
  //   products.map((product, index) => {
  //     if (product.tags) {
  //       product.tags.map((tag) => {
  //         const index = uniqueBrands.indexOf(tag);
  //         if (index === -1) uniqueBrands.push(tag);
  //       });
  //     }
  //   });
  //   for (var i = 0; i < uniqueBrands.length; i++) {
  //     itemBrand.push({ brand: uniqueBrands[i] });
  //   }
  //   this.tags = itemBrand;
  // }

  public getTags(products) {
    const uniqueBrands = [];
    products.filter((item) => {
      uniqueBrands.push(item.brand_name);
    });
    let allBrand = Array.from(new Set(uniqueBrands));
    const itemBrand = Array();
    allBrand.forEach((i) => {
      itemBrand.push({brand: i});
    });
    this.tags = itemBrand;
  }


  // Ram Filters
  public getRams(products) {
    const uniqueRams = [];
    products.filter((item) => {
      uniqueRams.push(item.prod_ram);
    });
    let allRam = Array.from(new Set(uniqueRams));
    const itemRam = Array();
    allRam.forEach((i) => {
      itemRam.push({ram: i});
    });
    this.rams = itemRam;
  }

   // Capacity Filters
   public getCapacity(products) {
    const uniqueCapacity = [];
    products.filter((item) => {
      uniqueCapacity.push(item.prod_disksize);
    });
    let allCapacity = Array.from(new Set(uniqueCapacity));
    const itemCapacity = Array();
    allCapacity.forEach((i) => {
      itemCapacity.push({capacity: i});
    });
    this.capacityH = itemCapacity;
  }

  // Processor Filters
  public getProcessor(products) {
    const uniqueProcessor = [];
    products.filter((item) => {
      uniqueProcessor.push(item.prod_processor);
    });
    let allProcessor = Array.from(new Set(uniqueProcessor));
    const itemProcessor = Array();
    allProcessor.forEach((i) => {
      itemProcessor.push({processor: i});
    });
    this.processor = itemProcessor;
  }

  // Processor storage type
  public getStorage(products) {
    const uniqueStorage = [];
    products.filter((item) => {
      uniqueStorage.push(item.prod_disktype);
    });
    let allStorage = Array.from(new Set(uniqueStorage));
    const itemStorage = Array();
    allStorage.forEach((i) => {
      let name = (i === '0') ? 'HDD' : 'SSD';
      itemStorage.push({storage: i, dispName: name});
    });
    this.storage = itemStorage;
  }

  // Get current product colors
  public getColors(products) {
    var uniqueColors = [];
    var itemColor = Array();
    products.map((product, index) => {
      if (product.colors) {
        product.colors.map((color) => {
          const index = uniqueColors.indexOf(color);
          if (index === -1) uniqueColors.push(color);
        });
      }
    });
    for (var i = 0; i < uniqueColors.length; i++) {
      itemColor.push({ color: uniqueColors[i] });
    }
    this.colors = itemColor;
  }

  // Get Brands


  // Animation Effect fadeIn
  public fadeIn() {
    this.animation = "fadeIn";
  }

  // Animation Effect fadeOut
  public fadeOut() {
    this.animation = "fadeOut";
  }

  // Initialize filetr Items
  public filterItems(): Product[] {
    let filteredProducts = [];
    filteredProducts = this.items.filter((item: Product) => {

      if (this.tagsFilters.length === 0) {
        return true;
      }

      if (this.tagsFilters.includes(item.brand_name)) {
        return true;
      }
    });

    filteredProducts = filteredProducts.filter((item: Product) => {

      if (this.ramsFilters.length === 0) {
        return true;
      }

      if (this.ramsFilters.includes(item.prod_ram)) {
        return true;
      }
    });

    filteredProducts = filteredProducts.filter((item: Product) => {

      if (this.capacityHFilters.length === 0) {
        return true;
      }

      if (this.capacityHFilters.includes(item.prod_disksize)) {
        return true;
      }
    });

    filteredProducts = filteredProducts.filter((item: Product) => {

      if (this.processorsHFilters.length === 0) {
        return true;
      }

      if (this.processorsHFilters.includes(item.prod_processor)) {
        return true;
      }
    });

    filteredProducts = filteredProducts.filter((item: Product) => {

      if (this.storageHFilters.length === 0) {
        return true;
      }

      if (this.storageHFilters.includes(item.prod_disktype)) {
        return true;
      }
    });


    return filteredProducts;
  }

  // Update tags filter
  public updateTagFilters(tags: any[]) {
    this.tagsFilters = tags;
    this.animation === 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }

  // Update Ram filter
  public updateRamFilters(tags: any[]) {
    this.ramsFilters = tags;
    this.animation === 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }

  // Update Capacity filter
  public updateCapacityFilters(tags: any[]) {
    this.capacityHFilters = tags;
    this.animation === 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }

  // Update Processor filter
  public updateProcessorFilters(tags: any[]) {
    this.processorsHFilters = tags;
    this.animation === 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }

  // Update Processor filter
  public updateStorageFilters(tags: any[]) {
    this.storageHFilters = tags;
    this.animation === 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }

  // Update color filter
  public updateColorFilters(colors: ColorFilter[]) {
    this.colorFilters = colors;
    this.animation === 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }

  // Update price filter
  public updatePriceFilters(price: any) {
    let items: any[] = [];
    this.products.filter((item: Product) => {
      if (parseInt(item.prod_price) >= price[0] && parseInt(item.prod_price) <= price[1]) {
        items.push(item); // push in array
      }
    });
    this.items = items;
  }

  public twoCol() {
    if ($(".product-wrapper-grid").hasClass("list-view")) {
    } else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid")
        .children()
        .children()
        .children()
        .addClass("col-lg-6");
    }
  }

  public threeCol() {
    if ($(".product-wrapper-grid").hasClass("list-view")) {
    } else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid")
        .children()
        .children()
        .children()
        .addClass("col-lg-4");
    }
  }

  public fourCol() {
    if ($(".product-wrapper-grid").hasClass("list-view")) {
    } else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid")
        .children()
        .children()
        .children()
        .addClass("col-lg-3");
    }
  }

  public sixCol() {
    if ($(".product-wrapper-grid").hasClass("list-view")) {
    } else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid")
        .children()
        .children()
        .children()
        .addClass("col-lg-2");
    }
  }

  // For mobile filter view
  public mobileFilter() {
    $(".collection-filter").css("left", "-15px");
  }

  // Infinite scroll
  public onScroll() {
    this.lastKey = _.last(this.allItems)["id"];
    if (this.lastKey != _.last(this.items)["id"]) {
      this.finished = false;
    }
    // If data is identical, stop making queries
    if (this.lastKey == _.last(this.items)["id"]) {
      this.finished = true;
    }
    if (this.products.length < this.allItems.length) {
      let len = this.products.length;
      for (var i = len; i < len + 4; i++) {
        if (this.allItems[i] == undefined) return true;
        this.products.push(this.allItems[i]);
      }
    }
  }

  // sorting type ASC / DESC / A-Z / Z-A etc.
  public onChangeSorting(val) {
    this.sortByOrder = val;
    this.animation == "fadeOut" ? this.fadeIn() : this.fadeOut(); // animation
  }
}
