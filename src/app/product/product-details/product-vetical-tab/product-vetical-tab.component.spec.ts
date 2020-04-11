import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVeticalTabComponent } from './product-vetical-tab.component';

describe('ProductVeticalTabComponent', () => {
  let component: ProductVeticalTabComponent;
  let fixture: ComponentFixture<ProductVeticalTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductVeticalTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVeticalTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
