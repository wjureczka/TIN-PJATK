import { Component, OnInit } from '@angular/core';
import {SessionService} from "../session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit(): void {
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }

}
