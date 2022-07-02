import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdocumentosComponent } from './verdocumentos.component';

describe('VerdocumentosComponent', () => {
  let component: VerdocumentosComponent;
  let fixture: ComponentFixture<VerdocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerdocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
