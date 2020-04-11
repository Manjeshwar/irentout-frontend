import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductColRightComponent } from './product-col-right.component';

describe('ProductColRightComponent', () => {
  let component: ProductColRightComponent;
  let fixture: ComponentFixture<ProductColRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductColRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductColRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
