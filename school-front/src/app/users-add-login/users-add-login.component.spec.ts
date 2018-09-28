import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAddLoginComponent } from './users-add-login.component';

describe('UsersAddLoginComponent', () => {
  let component: UsersAddLoginComponent;
  let fixture: ComponentFixture<UsersAddLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAddLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAddLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
