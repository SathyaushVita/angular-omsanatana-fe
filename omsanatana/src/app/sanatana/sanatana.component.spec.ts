import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanatanaComponent } from './sanatana.component';

describe('SanatanaComponent', () => {
  let component: SanatanaComponent;
  let fixture: ComponentFixture<SanatanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SanatanaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SanatanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
