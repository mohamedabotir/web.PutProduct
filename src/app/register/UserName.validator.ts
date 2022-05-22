import { HttpClient } from '@angular/common/http';
import { Observable, map, delay } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import {ajax} from 'rxjs/ajax'
import { environment } from 'src/environments/environment';
export function validatePassword():AsyncValidatorFn{
  return (controls:AbstractControl):Observable<ValidationErrors|null>=>{
    console.log(controls);
    return check(controls.value).pipe(
      map(res => {
        console.log(res,controls.value);
        return res == null?null: { userNameExists: true };
      })
    );
  }

  function check(name:any):Observable<any>{
    return ajax.getJSON(environment.url+"Identity/checkUserName?name="+name).pipe(delay(1000));
  }
}



export function validateEmail():AsyncValidatorFn{
  return (controls:AbstractControl):Observable<ValidationErrors|null>=>{

    return check(controls.value).pipe(
      map(res => {
        console.log(res);
        return res == null?null: { emailExists: true };
      })
    );
  }

  function check(email:any):Observable<any>{
    return ajax.getJSON(environment.url+"Identity/checkEmail?email="+email).pipe(delay(1000));
  }
}
