import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRightImageComponent } from './product-right-image.component';

describe('ProductRightImageComponent', () => {
  let component: ProductRightImageComponent;
  let fixture: ComponentFixture<ProductRightImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRightImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRightImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
