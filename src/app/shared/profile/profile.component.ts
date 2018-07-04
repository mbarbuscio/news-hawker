import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService) { 
    this.authService.currentUser.subscribe(currentUser => {
      this.user = currentUser;
    });
  }

  ngOnInit() {
  }

  signOut() {
    this.authService.signOut();
  }
}
