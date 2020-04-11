import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRightSidebarComponent } from './product-right-sidebar.component';

describe('ProductRightSidebarComponent', () => {
  let component: ProductRightSidebarComponent;
  let fixture: ComponentFixture<ProductRightSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRightSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRightSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
