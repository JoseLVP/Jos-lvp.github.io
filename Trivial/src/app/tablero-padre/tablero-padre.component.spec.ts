import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroPadreComponent } from './tablero-padre.component';

describe('TableroPadreComponent', () => {
  let component: TableroPadreComponent;
  let fixture: ComponentFixture<TableroPadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableroPadreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroPadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
