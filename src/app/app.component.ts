import { NotificationService } from './Services/notification.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AuthService } from './Services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
userId?:any;
notificationMessage!:any;
Notifications!:any;
ispushed = false;

  constructor(private auth:AuthService,private notificationService:NotificationService) {


  }


  ngOnInit(): void {

    this.notificationService.getNotifications().subscribe((data)=>{
     this.Notifications = data;
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
      if(this.userId == data.receiverId){

        console.log(data);
        this.notificationMessage = data.message;
        this.Notifications.push(this.notificationMessage);
        this.ispushed = true;

      }
    });
  }
  title = 'web.PutProduct';


}
