import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionRightSidebarComponent } from './collection-right-sidebar.component';

describe('CollectionRightSidebarComponent', () => {
  let component: CollectionRightSidebarComponent;
  let fixture: ComponentFixture<CollectionRightSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionRightSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionRightSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
