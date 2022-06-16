import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdicionalComponent } from './dialog-adicional.component';

describe('DialogAdicionalComponent', () => {
  let component: DialogAdicionalComponent;
  let fixture: ComponentFixture<DialogAdicionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAdicionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
