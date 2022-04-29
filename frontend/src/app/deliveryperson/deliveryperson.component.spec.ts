import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverypersonComponent } from './deliveryperson.component';

describe('DeliverypersonComponent', () => {
  let component: DeliverypersonComponent;
  let fixture: ComponentFixture<DeliverypersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverypersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverypersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
