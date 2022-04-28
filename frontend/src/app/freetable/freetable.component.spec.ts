import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreetableComponent } from './freetable.component';

describe('FreetableComponent', () => {
  let component: FreetableComponent;
  let fixture: ComponentFixture<FreetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreetableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
