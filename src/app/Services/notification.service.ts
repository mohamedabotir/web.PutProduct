import { NotificationData } from './../../Shared/notifications';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private client:HttpClient) {

  }
  getNotifications(){
   return this.client.get("http://localhost:20076/api/Notification/GetNotifications");
  }

  getNotificationCount(){
    return this.client.get("http://localhost:20076/api/Notification/GetNotificationsCount");
  }
  markNotificationAsRead(notifications:Array<NotificationData>){
return this.client.post("http://localhost:20076/api/Notification/MarkNotificationAsReaded",notifications);
  }
}
