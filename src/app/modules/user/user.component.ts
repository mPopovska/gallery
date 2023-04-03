import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  protected user: User | null = null;
  ngOnInit(): void {
    const user = localStorage.getItem('userInfo');
    if (user) {
      this.user = JSON.parse(user) as User;
    }
  }

}
