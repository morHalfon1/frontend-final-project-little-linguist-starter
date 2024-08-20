import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsButtonComponent } from './coins-button.component';

describe('CoinsButtonComponent', () => {
  let component: CoinsButtonComponent;
  let fixture: ComponentFixture<CoinsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinsButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoinsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
