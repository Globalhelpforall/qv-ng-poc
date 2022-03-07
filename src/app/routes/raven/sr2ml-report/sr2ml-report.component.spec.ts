import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sr2mlReportComponent } from './sr2ml-report.component';

describe('Sr2mlReportComponent', () => {
  let component: Sr2mlReportComponent;
  let fixture: ComponentFixture<Sr2mlReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sr2mlReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sr2mlReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
