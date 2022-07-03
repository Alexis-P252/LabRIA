import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUnidadesComponent } from './ver-unidades.component';

describe('VerUnidadesComponent', () => {
  let component: VerUnidadesComponent;
  let fixture: ComponentFixture<VerUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerUnidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
