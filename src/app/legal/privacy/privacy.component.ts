import { Component, OnInit, HostBinding } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  @HostBinding('class.dark') get isDark():boolean {
    return this.isDarkTheme;
  }
  
  isDarkTheme: boolean = false;

  constructor(private configService: ConfigService) { 
    configService.theme().subscribe(isDark => {
      this.isDarkTheme = isDark;
    });
  }

  ngOnInit() {

  }

}
