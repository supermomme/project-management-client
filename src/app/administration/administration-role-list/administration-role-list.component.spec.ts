import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationRoleListComponent } from './administration-role-list.component';

describe('AdministrationRoleListComponent', () => {
  let component: AdministrationRoleListComponent;
  let fixture: ComponentFixture<AdministrationRoleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationRoleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
