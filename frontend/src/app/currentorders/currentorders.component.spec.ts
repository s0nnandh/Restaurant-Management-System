import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentordersComponent } from './currentorders.component';

describe('CurrentordersComponent', () => {
  let component: CurrentordersComponent;
  let fixture: ComponentFixture<CurrentordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
