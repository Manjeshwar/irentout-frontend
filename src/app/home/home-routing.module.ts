import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionLeftSidebarComponent } from '../product/collection/collection-left-sidebar/collection-left-sidebar.component';
import { CollectionRightSidebarComponent } from '../product/collection/collection-right-sidebar/collection-right-sidebar.component';
import { CollectionNoSidebarComponent } from '../product/collection/collection-no-sidebar/collection-no-sidebar.component';
// import { ProductLeftSidebarComponent } from '../product/product-details/product-left-sidebar/product-left-sidebar.component';
// import { ProductRightSidebarComponent } from '../product/product-details/product-right-sidebar/product-right-sidebar.component';
// import { ProductNoSidebarComponent } from '../product/product-details/product-no-sidebar/product-no-sidebar.component';
// import { ProductColLeftComponent } from '../product/product-details/product-col-left/product-col-left.component';
// import { ProductColRightComponent } from '../product/product-details/product-col-right/product-col-right.component';
// import { ProductColumnComponent } from '../product/product-details/product-column/product-column.component';
// import { ProductAccordianComponent } from '../product/product-details/product-accordian/product-accordian.component';
// // import { ProductLeftImageComponent } from '../product/product-details/product-left-image/product-left-image.component';
// import { ProductRightImageComponent } from '../product/product-details/product-right-image/product-right-image.component';
import { ProductDetailsComponent } from '../product/product-details/product-details.component';
// import { ProductVeticalTabComponent } from '../product/product-details/product-vetical-tab/product-vetical-tab.component';
import { SearchComponent } from '../product/search/search.component';
import { WishlistComponent } from '../product/wishlist/wishlist.component';
import { ProductCompareComponent } from '../product/product-compare/product-compare.component';
import { CartComponent } from '../product/cart/cart.component';
import { CheckoutComponent } from '../product/checkout/checkout.component';
import { SuccessComponent } from '../product/success/success.component';
import { HomeComponent } from './home.component';
import { RegisterComponent } from '../pages/register/register.component';


// Routes
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'category/:category',
    component: CollectionLeftSidebarComponent
  },
  // {
  //   path: 'right-sidebar/collection/:category',
  //   component: CollectionRightSidebarComponent
  // },
  // {
  //   path: 'no-sidebar/collection/:category',
  //   component: CollectionNoSidebarComponent
  // },
  // {
  //   path: 'left-sidebar/product/:id',
  //   component: ProductLeftSidebarComponent
  // },
  // {
  //   path: 'right-sidebar/product/:id',
  //   component: ProductRightSidebarComponent
  // },
  // {
  //   path: 'no-sidebar/product/:id',
  //   component: ProductNoSidebarComponent
  // },
  // {
  //   path: 'col-left/product/:id',
  //   component: ProductColLeftComponent
  // },
  // {
  //   path: 'col-right/product/:id',
  //   component: ProductColRightComponent
  // },
  // {
  //   path: 'column/product/:id',
  //   component: ProductColumnComponent
  // },
  // {
  //   path: 'accordian/product/:id',
  //   component: ProductAccordianComponent
  // },
  // {
  //   path: 'left-image/product/:id',
  //   component: ProductLeftImageComponent
  // },
  // {
  //   path: 'right-image/product/:id',
  //   component: ProductRightImageComponent
  // },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    data: {
      title: 'Laptops for rent',
      description:'Best Laptops for rent',
      ogUrl: 'http://irentout.com/Bangalore/product/fci1669-21:9:2020-22-45-2-410',
      ogType: 'website',
      ogTitle:'Laptops for rent',
      ogDescription:'Best laptops for rent',
      ogImage:'http://localhost:3000/images/products/1600708502384-lappy.jpg'
    }
  },
  // {
  //   path: 'vertical/product/:id',
  //   component: ProductVeticalTabComponent
  // },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'wishlist',
    component: WishlistComponent
  },
  {
    path: 'compare',
    component: ProductCompareComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'checkout/success',
    component: SuccessComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
