import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductColumnComponent } from './product-column.component';

describe('ProductColumnComponent', () => {
  let component: ProductColumnComponent;
  let fixture: ComponentFixture<ProductColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
