import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacoDetalheComponent } from './espaco-detalhe.component';

describe('EspacoDetalheComponent', () => {
  let component: EspacoDetalheComponent;
  let fixture: ComponentFixture<EspacoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspacoDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspacoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
