import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/auth.service";
import {User} from "../../../shared/user";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {
  currentUser : User = {};
  constructor(public authService: AuthService,
              private actRoute: ActivatedRoute,) {
    // @ts-ignore
    let id = +this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res.msg.id;
    })
  };

  logout() {
    this.authService.doLogout();
  };

  ngOnInit(): void {
  };

}
