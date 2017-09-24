import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationRoleEditComponent } from './administration-role-edit.component';

describe('AdministrationRoleEditComponent', () => {
  let component: AdministrationRoleEditComponent;
  let fixture: ComponentFixture<AdministrationRoleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationRoleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationRoleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
