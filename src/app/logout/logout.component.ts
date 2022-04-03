import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../Services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private auth:AuthService,private route:ActivatedRoute,private router:Router,private toast:ToastrService) { }

  ngOnInit(): void {
this.checkToken();
  }

  checkToken(){
    let token = this.auth.Token();
    if(token)
    {
      this.auth.Logout();
      this.router.navigate(['/']);
      this.toast.success("Logged out Successfully");
      return;
    }
    else{
      this.router.navigate(['/']);
      this.toast.error("Your 're not signed in");
      return;
    }
  }

}
