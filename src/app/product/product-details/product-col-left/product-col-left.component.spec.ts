import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductColLeftComponent } from './product-col-left.component';

describe('ProductColLeftComponent', () => {
  let component: ProductColLeftComponent;
  let fixture: ComponentFixture<ProductColLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductColLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductColLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
