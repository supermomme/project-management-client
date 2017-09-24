import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationUserEditComponent } from './administration-user-edit.component';

describe('AdministrationUserEditComponent', () => {
  let component: AdministrationUserEditComponent;
  let fixture: ComponentFixture<AdministrationUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationUserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
