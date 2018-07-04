import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { config } from 'rxjs';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent implements OnInit {

  darkTheme: boolean = false;
  constructor(private configService: ConfigService) { 
    configService.theme().subscribe(isDark => {
      this.darkTheme = isDark;
    });
  }

  ngOnInit() {
  }

  toggle() {
    this.configService.toggleTheme();
  }

}
