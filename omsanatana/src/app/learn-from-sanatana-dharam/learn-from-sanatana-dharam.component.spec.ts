import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnFromSanatanaDharamComponent } from './learn-from-sanatana-dharam.component';

describe('LearnFromSanatanaDharamComponent', () => {
  let component: LearnFromSanatanaDharamComponent;
  let fixture: ComponentFixture<LearnFromSanatanaDharamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnFromSanatanaDharamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnFromSanatanaDharamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
