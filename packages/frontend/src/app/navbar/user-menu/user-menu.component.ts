import {Component, OnInit} from '@angular/core';
import {AuthService, User} from "../../shared/auth.service";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  public user: User;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    })
  }

}
