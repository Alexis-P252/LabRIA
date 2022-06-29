import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesCurricularesComponent } from './unidades-curriculares.component';

describe('UnidadesCurricularesComponent', () => {
  let component: UnidadesCurricularesComponent;
  let fixture: ComponentFixture<UnidadesCurricularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadesCurricularesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesCurricularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
