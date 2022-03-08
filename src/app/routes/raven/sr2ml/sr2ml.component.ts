import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { MatDialog } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';

import { ApiService } from '../../../core/services';
import { Sr2mlReportComponent } from './../sr2ml-report/sr2ml-report.component';

@Component({
  selector: 'app-sr2ml',
  templateUrl: './sr2ml.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./sr2ml.component.scss']
})
export class Sr2mlComponent implements OnInit {

  // Advanced Layout
  form = new FormGroup({});
  model: any = {};
  input: any;

  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroup: [
        {
          key: 'models',
          wrappers: ['panel'],
          templateOptions: { label: 'ExternalModel' },
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-sm-3',
              type: 'combobox',
              key: 'modelName',
              templateOptions: {
                label: 'Model Names',
                options: [
                  { value: "ET", name: 'Event Tree' },
                  { value: "FT", name: 'Fault Tree' },
                  { value: "graph", name: 'graph' },
                  { value: "markov", name: 'markov' },
                ],
                labelProp: 'name',
                valueProp: (option) => option,
                compareWith: (o1, o2) => o1.value === o2.value,
                required: true,
                description: 'Choose an SR2ML model type. Default fault tree.',
              },
              wrappers: ['form-field'],
            },
            {
              className: 'col-sm-3',
              type: 'combobox',
              key: 'subType',
              templateOptions: {
                label: 'Sub Type',
                options: [
                  { value: "SR2ML.ETModel", name: 'SR2ML.ETModel' },
                  { value: "SR2ML.FTModel", name: 'SR2ML.FTModel' },
                  { value: "SR2ML.GraphModel", name: 'SR2ML.GraphModel' },
                  { value: "SR2ML.MarkovModel", name: 'SR2ML.MarkovModel' },
                ],
                labelProp: 'name',
                valueProp: (option) => option,
                compareWith: (o1, o2) => o1.value === o2.value,
                required: true,
                description: 'Choose an SR2ML model subtype.',
              },
              wrappers: ['form-field'],
            },
            {
              className: 'col-sm-3',
              type: 'input',
              key: 'topEvents',
              templateOptions: {
                label: 'Top Events',
                required: false,
                placeholder: 'Top Events',
              },
            },
            {
              className: 'col-sm-3',
              key: 'map',
              type: 'select',
              templateOptions: {
                label: 'Maps',
                multiple: true,
                valueProp: (option) => option,
                compareWith: (o1, o2) => o1.value === o2.value,
                options: [
                  {label: 'BE1', value: 'statusBE1'},
                  {label: 'BE2', value: 'statusBE2'},
                  {label: 'BE3', value: 'statusBE3'},
                  {label: 'BE4', value: 'statusBE4'}
                ],
              },
            }
          ],
        },
        {
          key: 'distributions',
          wrappers: ['panel'],
          templateOptions: { label: 'Distributions' },
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-sm-3',
              type: 'combobox',
              key: 'names',
              templateOptions: {
                label: 'Names',
                options: [
                  { value: "binomial", name: 'BinomialDistribution' },
                  { value: "bernoulli", name: 'BernoulliDistribution' },
                  { value: "markov", name: 'MarkovCategorical' },
                  { value: "exponential", name: 'ExponentialDistribution' },
                  { value: "gamma", name: 'GammaDistribution' },
                  { value: "beta", name: 'BetaDistribution' },
                ],
                labelProp: 'name',
                valueProp: (option) => option,
                compareWith: (o1, o2) => o1.value === o2.value,
                required: true,
                description: 'Choose a distribution for the data.',
              },
              wrappers: ['form-field'],
            }
          ],
        },
        {
          key: 'samplers',
          wrappers: ['panel'],
          templateOptions: { label: 'Samplers' },
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-sm-3',
              type: 'combobox',
              key: 'names',
              templateOptions: {
                label: 'Names',
                options: [
                  { value: "MonteCarlo", name: 'MonteCarlo' },
                  { value: "Stratified", name: 'Stratified' },
                  { value: "Grid", name: 'Grid Based' },
                  { value: "Sparse Grid", name: 'Sparse Grid Collocation' },
                  { value: "Sobol", name: 'Sobol Decomposition' }
                ],
                labelProp: 'name',
                valueProp: (option) => option,
                compareWith: (o1, o2) => o1.value === o2.value,
                required: true,
                description: 'Choose a sampling strategy.',
              },
              wrappers: ['form-field'],
            }
          ],
        },
        {
          key: 'runinfo',
          wrappers: ['panel'],
          templateOptions: { label: 'Run info' },
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-sm-3',
              type: 'input',
              key: 'workingDirectory',
              templateOptions: {
                label: 'Working Directory',
                options: [
                  { value: "binomial", name: 'ETmodel' },
                  { value: "bernoulli", name: 'ETmodelTD' },
                  { value: "markov", name: 'FTmodel' },
                  { value: "exponential", name: 'FTmodelTD' }
                ],
                labelProp: 'name',
                valueProp: (option) => option,
                compareWith: (o1, o2) => o1.value === o2.value,
                required: true,
                description: 'Choose a base directory from which to run SR2ML.',
              },
              wrappers: ['form-field'],
            },
            {
              className: 'col-sm-3',
              type: 'input',
              key: 'outputDir',
              templateOptions: {
                label: 'Output Directory',
                required: false,
                description: 'Relative to working directory. If none selected, will use working directory.',
              },
            },
            {
              className: 'col-sm-3',
              type: 'input',
              key: 'batchSize',
              templateOptions: {
                label: 'Batch Size',
                required: false,
              },
            },
            {
              className: 'col-sm-3',
              type: 'input',
              key: 'inputFile',
              templateOptions: {
                label: 'Data File',
                required: false,
              },
            },
          ],
        }
      ],
    }
  ];

  constructor(private toastr: ToastrService, private api:  ApiService, public dialog: MatDialog) {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.input = {};
      for (var key in this.model){
        this.input[key]=JSON.stringify(this.model[key])
      }

      // this.showToast(this.model);
      this.api.get("raven/sr2ml", this.input).subscribe((data)=>{
        if(data.status == "success"){
          // this.showToast("SR2ML input XML has been created successfully. RAVEN is running SR2ML.");
          if(data?.result?.raven_report){
            let config= { data: {'raven_report': JSON.parse(data["result"]['raven_report']) } }
            this.openReportDialog(Sr2mlReportComponent, config)
          }
          else{
            this.showToast("SR2ML couldn't find any report.");
          }
        }

      },
      (error)=>{
          this.api.errorResponse(error);
          console.log('Submission error')
      });
    }
  }

  showToast(obj: any) {
    this.toastr.success(JSON.stringify(obj));
  }

  openReportDialog(component, config= {}, ...args): void {
    const dialogRef = this.dialog.open(component, {
      width: '40%',
      data: {},
      ...config
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
