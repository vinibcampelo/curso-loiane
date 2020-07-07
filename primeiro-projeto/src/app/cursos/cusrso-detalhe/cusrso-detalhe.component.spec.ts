import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusrsoDetalheComponent } from './cusrso-detalhe.component';

describe('CusrsoDetalheComponent', () => {
  let component: CusrsoDetalheComponent;
  let fixture: ComponentFixture<CusrsoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusrsoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusrsoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
