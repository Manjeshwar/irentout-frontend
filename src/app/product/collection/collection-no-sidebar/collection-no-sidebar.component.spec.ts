import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionNoSidebarComponent } from './collection-no-sidebar.component';

describe('CollectionNoSidebarComponent', () => {
  let component: CollectionNoSidebarComponent;
  let fixture: ComponentFixture<CollectionNoSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionNoSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionNoSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
