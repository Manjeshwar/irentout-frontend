import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { IsotopeModule } from 'ngx-isotope';
import { SharedModule } from '../shared/shared.module';

import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LookbookComponent } from './lookbook/lookbook.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CollectionComponent } from './collection/collection.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CompareComponent } from './compare/compare.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FaqComponent } from './faq/faq.component';
import { TypographyComponent } from './typography/typography.component';
import { GridTwoColComponent } from './portfolio/grid-two-col/grid-two-col.component';
import { GridThreeColComponent } from './portfolio/grid-three-col/grid-three-col.component';
import { GridFourColComponent } from './portfolio/grid-four-col/grid-four-col.component';
import { MasonaryTwoGridComponent } from './portfolio/masonary-two-grid/masonary-two-grid.component';
import { MasonaryThreeGridComponent } from './portfolio/masonary-three-grid/masonary-three-grid.component';
import { MasonaryFourGridComponent } from './portfolio/masonary-four-grid/masonary-four-grid.component';
import { MasonaryFullwidthComponent } from './portfolio/masonary-fullwidth/masonary-fullwidth.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FailureComponent } from './failure/failure.component';
import { OrdersComponent } from './orders/orders.component';
import { AddressesComponent } from './addresses/addresses.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileAddressComponent } from './profile-address/profile-address.component';
import { AddAddressComponent } from '../pages/add-address/add-address.component';
import { AddBillingAddressComponent } from '../pages/add-billing-address/add-billing-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { SettingsComponent } from './settings/settings.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    SlickCarouselModule,
    IsotopeModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    AddAddressComponent,
    AddBillingAddressComponent,
    FaqComponent,
    ComingSoonComponent
  ],
  declarations: [
    AboutUsComponent,
    ComingSoonComponent,
    ErrorPageComponent,
    LookbookComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    WishlistComponent,
    CartComponent,
    CollectionComponent,
    ForgetPasswordComponent,
    ContactComponent,
    CheckoutComponent,
    CompareComponent,
    OrderSuccessComponent,
    DashboardComponent,
    FaqComponent,
    TypographyComponent,
    GridTwoColComponent,
    GridThreeColComponent,
    GridFourColComponent,
    MasonaryTwoGridComponent,
    MasonaryThreeGridComponent,
    MasonaryFourGridComponent,
    MasonaryFullwidthComponent,
    FailureComponent,
    ResetPasswordComponent,
    OrdersComponent,
    AddressesComponent,
    AddAddressComponent,
    AddBillingAddressComponent,
    ProfileComponent,
    ProfileAddressComponent,
    EditAddressComponent,
    SettingsComponent,
    ComingSoonComponent
  ]
})
export class PagesModule { }
