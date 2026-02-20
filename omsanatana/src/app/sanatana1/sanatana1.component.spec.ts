import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sanatana1Component } from './sanatana1.component';

describe('Sanatana1Component', () => {
  let component: Sanatana1Component;
  let fixture: ComponentFixture<Sanatana1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sanatana1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sanatana1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
