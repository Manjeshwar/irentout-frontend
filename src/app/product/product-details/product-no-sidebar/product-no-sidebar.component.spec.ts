import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNoSidebarComponent } from './product-no-sidebar.component';

describe('ProductNoSidebarComponent', () => {
  let component: ProductNoSidebarComponent;
  let fixture: ComponentFixture<ProductNoSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductNoSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductNoSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
