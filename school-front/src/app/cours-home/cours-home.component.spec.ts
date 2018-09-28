import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursHomeComponent } from './cours-home.component';

describe('CoursHomeComponent', () => {
  let component: CoursHomeComponent;
  let fixture: ComponentFixture<CoursHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
