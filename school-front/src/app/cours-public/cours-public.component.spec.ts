import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursPublicComponent } from './cours-public.component';

describe('CoursPublicComponent', () => {
  let component: CoursPublicComponent;
  let fixture: ComponentFixture<CoursPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
