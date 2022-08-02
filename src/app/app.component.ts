import { NotificationData } from './../Shared/notifications';
import { NotificationService } from './Services/notification.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AuthService } from './Services/auth.service';
import { CartService } from './Services/cart-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
@HostListener('window:offline',['$event'])
isWindowOffline(event:any){
  alert('offline!')
  console.log(event);
}
userId?:any;
notificationMessage!:any;
Notifications!:any;
ispushed = false;
notificationCount!:any;

  constructor(private auth:AuthService,private notificationService:NotificationService,public cart:CartService) {


  }


  ngOnInit(): void {
    if(this.auth.Token()){
    this.notificationService.getNotificationCount().subscribe(data=>{
      this.notificationCount = data;
      console.log(this.notificationCount,"asdd")
    });

    this.notificationService.getNotifications().subscribe((data)=>{
     this.Notifications= data;
    });


     this.auth.getUserId().subscribe(data=>{
       this.userId = data;
       });
    const connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl("http://localhost:20076/" + 'NotificationHub')
    .build();
    connection.start().then(function () {
      console.log('SignalR Connected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });
    connection.on("BroadcastNotification", (data) => {
      if(this.userId == data.receiverId && this.userId !=data.senderId){
        this.notificationCount++;
        console.log(data,"11111");
        this.notificationMessage = data;
        this.Notifications.push(data);

      }
    });
  }
  }
  title = 'web.PutProduct';
markRead(){


  this.notificationService.markNotificationAsRead(this.Notifications).subscribe(data=>{
   this.notificationCount = 0;
  });
}
getbyIndex(index:number){
  return index;
}
}
