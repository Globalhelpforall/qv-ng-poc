import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-sr2ml-report',
  templateUrl: './sr2ml-report.component.html',
  styleUrls: ['./sr2ml-report.component.scss']
})
export class Sr2mlReportComponent implements OnInit {


  sr2mlReportColumns: string[] = ['statusBE1', 'statusBE2', 'statusBE3', 'TOP'];

  sr2mlReportDataSource: any= [];
  constructor(public dialogRef: MatDialogRef<Sr2mlReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if(this.data?.raven_report){
      this.sr2mlReportDataSource = this.data.raven_report;
    }

  }

}
