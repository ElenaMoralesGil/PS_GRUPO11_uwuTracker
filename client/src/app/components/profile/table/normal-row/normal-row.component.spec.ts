import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalRowComponent } from './normal-row.component';

describe('NormalRowComponent', () => {
  let component: NormalRowComponent;
  let fixture: ComponentFixture<NormalRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormalRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
