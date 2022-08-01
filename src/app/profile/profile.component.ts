import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProductService } from './../Services/product.service';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { AuthService } from './../Services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/Shared/Profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
image!:string;
id!:any;
prof!:Profile;
form = this.fb.group({
name: ['',Validators.required],
bio: [''],
website: [''],
emailAddress: ['',Validators.required],
location: [''],
imageUrl: ['']

});
promo = this.fb.group({
  Name:[,Validators.required],
  DiscountValue:[,Validators.required],
  ExpireTime:[,Validators.required]
});
myId!:string
  constructor(private toast:ToastrService,private fb:FormBuilder,private product:ProductService,private Auth:AuthService,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.getProfile();
  }

  getProfile(){
     this.route.params.pipe(map(param=>{
       this.myId = localStorage.getItem("userId") as string;
       this.id = param["id"];
       console.log(this.id,"   ",this.myId);
       return this.id;
     }),mergeMap(id=>this.Auth.getProfile(id))).subscribe(data=>{
       console.log(data);
      this.image = data.imageUrl;
      this.form = this.fb.group({
      name: [data.name,[Validators.required]],
      bio: [data.bio],
      website: [data.website],
      emailAddress: [data.emailAddress,Validators.required],
      location: [data.location],
      imageUrl: [data.imageUrl]
       });
     });
  }
  onUpdate(){
    this.Auth.updateProfile(this.form.value).subscribe(data=>{
      console.log(data);
    });
  }
onCreateCode(){
console.log(this.promo.value)
this.product.createPromoCode(this.promo.value).subscribe(res=>{
  if(res == false){
    this.toast.error("Can't Add PromoCode")
  }else{
    this.toast.success('Created Success');
  }
})
}
}
