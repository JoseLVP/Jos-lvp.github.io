import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CubileteHijoComponent } from './cubilete-hijo.component';

describe('CubileteHijoComponent', () => {
  let component: CubileteHijoComponent;
  let fixture: ComponentFixture<CubileteHijoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CubileteHijoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CubileteHijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
