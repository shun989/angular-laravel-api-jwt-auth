import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../shared/user";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  // currentUser: Object = {};
  currentUser : User = {};

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    public router: Router
  ) {
    // @ts-ignore
    let id = +this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res.msg.id;
    })
  };

  ngOnInit(): void {
  }

}
