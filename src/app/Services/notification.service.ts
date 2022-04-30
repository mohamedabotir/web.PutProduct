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
}
