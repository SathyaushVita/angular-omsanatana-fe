import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sanatana2Component } from './sanatana2.component';

describe('Sanatana2Component', () => {
  let component: Sanatana2Component;
  let fixture: ComponentFixture<Sanatana2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sanatana2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sanatana2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
