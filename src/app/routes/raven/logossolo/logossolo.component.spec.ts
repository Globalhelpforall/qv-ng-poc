import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogosSoloComponent } from './logossolo.component';

describe('LogosSoloComponent', () => {
  let component: LogosSoloComponent;
  let fixture: ComponentFixture<LogosSoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogosSoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogosSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
