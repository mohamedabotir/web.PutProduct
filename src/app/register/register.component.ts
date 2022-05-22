import { AuthService } from './../Services/auth.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { groupBy } from 'rxjs';
import { validateEmail, validatePassword } from './UserName.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  spinner!:TemplateRef<any>|null
form = this.fb.group({
'Username':['',{validators:[Validators.required],
  asyncValidators:[validatePassword()],
  updateOn: 'blur'

}],
'Phone':['',[Validators.required]],
'Email':['',{validators:[Validators.required,Validators.email],
asyncValidators:[validateEmail()],
updateOn:'blur'
}],
'Password':['',[Validators.required,
  Validators.
  pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$")],
]
});
  constructor(private fb:FormBuilder,private auth:AuthService) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(data=>{
      console.log(this.form.controls['Username'])
    })
  }
onSubmit(){
  this.auth.Register(this.form.value).subscribe(data=>{

    console.log(data);
  });
  console.log(this.form);
}
}
