import { Component, OnInit, HostBinding } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @HostBinding('class.hidden') isHidden: boolean = true;

  loggedIn: boolean = false;

  constructor(private configService: ConfigService, private authService: AuthService) {
    configService.showSideBar.subscribe(sub => {
      this.isHidden = !sub;
    });

    authService.loggedIn.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
    })
  }

  ngOnInit() {
  }

  hide() {
    this.configService.toggleSideBar();
  }

}
