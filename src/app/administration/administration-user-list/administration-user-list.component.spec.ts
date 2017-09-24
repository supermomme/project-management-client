import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationUserListComponent } from './administration-user-list.component';

describe('AdministrationUserListComponent', () => {
  let component: AdministrationUserListComponent;
  let fixture: ComponentFixture<AdministrationUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
