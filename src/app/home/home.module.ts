import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BarRatingModule } from "ngx-bar-rating";
import { RangeSliderModule  } from 'ngx-rangeslider-component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxImgZoomModule } from 'ngx-img-zoom';

import { HomeComponent } from './home.component';
import { SliderComponent } from './slider/slider.component';
import { CollectionBannerComponent } from './collection-banner/collection-banner.component';
import { ProductTabComponent } from './product-tab/product-tab.component';
import { ParallaxBannerComponent } from './parallax-banner/parallax-banner.component';
import { BlogComponent } from './blog/blog.component';

import { ProductComponent } from '../product/product.component';
// import { ProductBoxComponent } from '../product/product-box/product-box.component';
// import { ProductBoxHoverComponent } from '../product/product-box-hover/product-box-hover.component';
// import { ProductBoxVerticalComponent } from '../product/product-box-vertical/product-box-vertical.component';
// import { ProductBoxMetroComponent } from '../product/product-box-metro/product-box-metro.component';
import { CollectionLeftSidebarComponent } from '../product/collection/collection-left-sidebar/collection-left-sidebar.component';
import { CollectionRightSidebarComponent } from '../product/collection/collection-right-sidebar/collection-right-sidebar.component';
import { CollectionNoSidebarComponent } from '../product/collection/collection-no-sidebar/collection-no-sidebar.component';
import { ColorComponent } from '../product/collection/filter/color/color.component';
import { BrandComponent } from '../product/collection/filter/brand/brand.component';
import { PriceComponent } from '../product/collection/filter/price/price.component';
// import { ProductLeftSidebarComponent } from '../product/product-details/product-left-sidebar/product-left-sidebar.component';
// import { ProductRightSidebarComponent } from '../product/product-details/product-right-sidebar/product-right-sidebar.component';
// import { ProductNoSidebarComponent } from '../product/product-details/product-no-sidebar/product-no-sidebar.component';
// import { ProductColLeftComponent } from '../product/product-details/product-col-left/product-col-left.component';
// import { ProductColRightComponent } from '../product/product-details/product-col-right/product-col-right.component';
// import { ProductColumnComponent } from '../product/product-details/product-column/product-column.component';
// import { ProductAccordianComponent } from '../product/product-details/product-accordian/product-accordian.component';
// import { ProductLeftImageComponent } from '../product/product-details/product-left-image/product-left-image.component';
// import { ProductRightImageComponent } from '../product/product-details/product-right-image/product-right-image.component';
import { ProductDetailsComponent } from '../product/product-details/product-details.component';
// import { ProductVeticalTabComponent } from '../product/product-details/product-vetical-tab/product-vetical-tab.component';
import { RelatedProductsComponent } from '../product/product-details/related-products/related-products.component';
import { SidebarComponent } from '../product/product-details/sidebar/sidebar.component';
import { CategoriesComponent } from '../product/widgets/categories/categories.component';
import { QuickViewComponent } from '../product/widgets/quick-view/quick-view.component';
import { ModalCartComponent } from '../product/widgets/modal-cart/modal-cart.component';
import { NewProductComponent } from '../product/widgets/new-product/new-product.component';
import { SearchComponent } from '../product/search/search.component';
import { ProductCompareComponent } from '../product/product-compare/product-compare.component';
import { WishlistComponent } from '../product/wishlist/wishlist.component';
import { CartComponent } from '../product/cart/cart.component';
import { CheckoutComponent } from '../product/checkout/checkout.component';
import { SuccessComponent } from '../product/success/success.component';
import { ExitPopupComponent } from '../product/widgets/exit-popup/exit-popup.component';
import { AgeVerificationComponent } from '../product/widgets/age-verification/age-verification.component';
import { NewsletterComponent } from '../product/widgets/newsletter/newsletter.component';
import { RamComponent } from '../product/collection/filter/ram/ram.component';
import { CapacityComponent } from '../product/collection/filter/capacity/capacity.component';
import { ProcessorComponent } from '../product/collection/filter/processor/processor.component';
import { StorageTypeComponent } from '../product/collection/filter/storage-type/storage-type.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddAddressComponent } from '../pages/add-address/add-address.component';


@NgModule({
  declarations: [
    HomeComponent,
    SliderComponent,
    CollectionBannerComponent,
    ProductTabComponent,
    ParallaxBannerComponent,
    BlogComponent,
    // Product
    ProductComponent,
    // ProductBoxComponent,
    // ProductBoxHoverComponent,
    // ProductBoxVerticalComponent,
    // ProductBoxMetroComponent,
    CollectionLeftSidebarComponent,
    CollectionRightSidebarComponent,
    CollectionNoSidebarComponent,
    ColorComponent,
    BrandComponent,
    RamComponent,
    CapacityComponent,
    ProcessorComponent,
    StorageTypeComponent,
    PriceComponent,
    // ProductLeftSidebarComponent,
    // ProductRightSidebarComponent,
    // ProductNoSidebarComponent,
    // ProductColLeftComponent,
    // ProductColRightComponent,
    // ProductColumnComponent,
    // ProductAccordianComponent,
    // ProductLeftImageComponent,
    // ProductRightImageComponent,
    ProductDetailsComponent,
    // ProductVeticalTabComponent,
    RelatedProductsComponent,
    SidebarComponent,
    CategoriesComponent,
    QuickViewComponent,
    ModalCartComponent,
    NewProductComponent,
    SearchComponent,
    ProductCompareComponent,
    WishlistComponent,
    CartComponent,
    CheckoutComponent,
    SuccessComponent,
    ExitPopupComponent,
    AgeVerificationComponent,
    NewsletterComponent,
    AddAddressComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    SharedModule,
    SlickCarouselModule,
    BarRatingModule,
    RangeSliderModule,
    InfiniteScrollModule,
    NgxPayPalModule,
    NgxImgZoomModule,
    NgbModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class HomeModule { }
