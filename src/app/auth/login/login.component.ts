import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  loginWithFB() {
    this.loading = true;
    this.authService.doFacebookLogin();
  }

  loginWithGoogle() {
    this.loading = true;
    this.authService.doGoogleLogin();
  }

}
