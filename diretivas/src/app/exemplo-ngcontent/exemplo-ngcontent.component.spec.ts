import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemploNgcontentComponent } from './exemplo-ngcontent.component';

describe('ExemploNgcontentComponent', () => {
  let component: ExemploNgcontentComponent;
  let fixture: ComponentFixture<ExemploNgcontentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExemploNgcontentComponent]
    });
    fixture = TestBed.createComponent(ExemploNgcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
