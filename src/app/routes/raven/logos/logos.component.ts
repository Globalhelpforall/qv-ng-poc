import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { ToastrService } from 'ngx-toastr';

import { ApiService } from '../../../core/services';
@Component({
  selector: 'app-logos',
  templateUrl: './logos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./logos.component.scss']
})

export class LogosComponent implements OnInit {
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
          templateOptions: { label: 'LOGOS Model' },
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-sm-3',
              type: 'combobox',
              key: 'modelName',
              templateOptions: {
                label: 'Model Names',
                options: [
                  { value: "knp", name: 'Knapsack' },
                  { value: "mkp", name: 'Multiple Knapsack' },              
                  { value: "inc_npv", name: 'Incremental NPV' },
                  { value: "ensemble", name: 'Ensemble' },
                ],//knapsack, battery replacement cashflow, incremental npv, capital investment, ensemble
                labelProp: 'name',
                valueProp: (option) => option,
                compareWith: (o1, o2) => o1.value === o2.value,
                required: true,
                description: ' ',
              },
              wrappers: ['form-field'],
            }
          ],
        },
        {
          key: 'stats',
          wrappers: ['panel'],
          templateOptions: { label: 'Distributions & Samplers' },
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-sm-3',
              type: 'combobox',
              key: 'distribution',
              templateOptions: {
                label: 'Select Distribution',
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
                description: ' ',
              },
              wrappers: ['form-field'],
            },
            {
              className: 'col-sm-3',
              type: 'combobox',
              key: 'sampler',
              templateOptions: {
                label: 'Select Sampler',
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
                description: ' ',
              },
              wrappers: ['form-field'],
            }
          ],
        },
        {
        key: 'variables',
        wrappers: ['panel'],
        templateOptions: { label: 'Variables' },
        fieldGroup:[
          {
            key: 'xmlfile',
            type: 'file',
            templateOptions: {
              required: false,
              description:'Input a .xml seed file or enter variables below.',
            },
          },
          {
            className: 'col-sm-6',
            type: 'input',
            key: 'var1',
            templateOptions: {
              label: 'Variable',
              required: false,
              description:'',
            },
            hideExpression:'model.xmlfile',
          },
          {
            className: 'col-sm-3',
            key: 'val1',
            type: 'input',
            templateOptions: {
              label: 'Value',
            },
            hideExpression:'model.xmlfile',
          },
          {
            className: 'col-sm-6',
            type: 'input',
            key: 'var2',
            templateOptions: {
              label: 'Variable',
              required: false,
            },
            hideExpression:'(!model.val1 && !model.var1) || model.xmlfile',
          },
          {
            key: 'val2',
            className: 'col-sm-3',
            type: 'input',
            templateOptions: {
              label: 'Value',
            },
            hideExpression:'(!model.val1 && !model.var1) || model.xmlfile',
          },
          {
            className: 'col-sm-6',
            type: 'input',
            key: 'var3',
            templateOptions: {
              label: 'Variable',
              required: false,
            },
            hideExpression:'!model.val2 || model.xmlfile',
          },
          {
            key: 'val3',
            className: 'col-sm-3',
            type: 'input',
            templateOptions: {
              label: 'Value',
            },
            hideExpression:'!model.val2 || model.xmlfile',
          },
          {
            className: 'col-sm-6',
            type: 'input',
            key: 'var4',
            templateOptions: {
              label: 'Variable',
              required: false,
            },
            hideExpression:'!model.val3 || model.xmlfile',
          },
          {
            key: 'val4',
            className: 'col-sm-3',
            type: 'input',
            templateOptions: {
              label: 'Value',
            },
            hideExpression:'!model.val3 || model.xmlfile',
          },
          {
            className: 'col-sm-6',
            type: 'input',
            key: 'var5',
            templateOptions: {
              label: 'Variable',
              required: false,
            },
            hideExpression:'!model.val4 || model.xmlfile',
          },
          {
            key: 'val5',
            className: 'col-sm-3',
            type: 'input',
            templateOptions: {
              label: 'Value',
            },
            hideExpression:'!model.val4 || model.xmlfile',
          },
          {
            className: 'col-sm-6',
            type: 'input',
            key: 'var6',
            templateOptions: {
              label: 'Variable',
              required: false,
            },
            hideExpression:'!model.val5 || model.xmlfile',
          },
          {
            key: 'val6',
            className: 'col-sm-3',
            type: 'input',
            templateOptions: {
              label: 'Value',
            },
            hideExpression:'!model.val5 || model.xmlfile',
          },
        ]
        },
        {
          key: 'runinfo',
          wrappers: ['panel'],
          templateOptions: { label: 'Run info' },
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-sm-3',
              type: 'combobox',
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
                description: 'Directory on this machine which contains data files.',
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
              key: 'inputFile',
              templateOptions: {
                label: 'Data File',
                required: false,
              }
            }
          ],
        }
      ],
    }
  ];
  constructor(private toastr: ToastrService, private api:  ApiService) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.input = {};
      for (var key in this.model){
        this.input[key]=JSON.stringify(this.model[key])
      }

      // this.showToast(this.model);
      this.api.get("raven/logos", this.input).subscribe((data)=>{
        if(data.status == "success"){
          this.showToast("LOGOS input Xml has been created successfully.");
        }
        
      },
      (error)=>{
          this.api.errorResponse(error);
      });
    }
  }

  showToast(obj: any) {
    this.toastr.success(JSON.stringify(obj));
  }

}
