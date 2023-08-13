import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretiveNgforComponent } from './diretive-ngfor.component';

describe('DiretiveNgforComponent', () => {
  let component: DiretiveNgforComponent;
  let fixture: ComponentFixture<DiretiveNgforComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiretiveNgforComponent]
    });
    fixture = TestBed.createComponent(DiretiveNgforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
