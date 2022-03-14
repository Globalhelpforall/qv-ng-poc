import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  validationErrors: any= {};

  constructor(private fb: FormBuilder,
    private api:  ApiService,
    private toastr: ToastrService,
    private router: Router) {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', []],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [this.confirmValidator]],
    });
  }

  ngOnInit() {}

  confirmValidator = (control: FormControl): { [k: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { error: true, confirm: true };
    }
    return {};
  };

  register(){
    if(this.registerForm.valid){
      this.api.post("auth/register", this.registerForm.value).subscribe(
        (data)=>{
          if(data){
            setTimeout(() => {
              this.router.navigateByUrl("auth/login");
            }, 1000);
          }
          else{
            this.showToast("Unable to register", 'warning');
          }
        this.validationErrors= {};
      },
      (error)=>{
        if(typeof(error)==="object"){
          this.validationErrors= {
            keys: Object.keys(error),
            errors: error
          }
        }
        else{
          console.error(error)
        }

      });
    }

  }

  showToast(obj: any, flag= 'success') {
    if(flag.toLocaleLowerCase() ==='error'){
      this.toastr.error(JSON.stringify(obj));
    }
    else if(flag.toLocaleLowerCase() ==='warning'){
      this.toastr.error(JSON.stringify(obj));
    }
    else{
      this.toastr.success(JSON.stringify(obj));
    }
  }
}
