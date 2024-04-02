import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyPopupComponent } from './emergency-popup.component';

describe('EmergencyPopupComponent', () => {
  let component: EmergencyPopupComponent;
  let fixture: ComponentFixture<EmergencyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmergencyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
