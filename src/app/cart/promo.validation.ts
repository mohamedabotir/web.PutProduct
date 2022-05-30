import { AbstractControl } from '@angular/forms';
import { AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, delay, map } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { environment } from 'src/environments/environment';
export function validateCode(total:any):AsyncValidatorFn{
   return (control:AbstractControl):Observable<ValidationErrors>=>{
    console.log(control);
    return check(control.value).pipe(
      map(res => {
        console.log(res,control.value);

          return res==null?{ codeNotExists: true }:{value:res};

      })
    );
  }

   function check(code:any):Observable<any>{
    return ajax.getJSON(environment.url+"product/checkPromoCode?code="+code+"&amount="+total).pipe(delay(1000));
  }
}
