import { Component, OnInit, HostBinding } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @HostBinding('class.hidden') isHidden: boolean = true;

  constructor(private configService: ConfigService) {
    configService.showSideBar.subscribe(sub => {
      this.isHidden = !sub;
    });
  }

  ngOnInit() {
  }

  hide() {
    this.isHidden = true;
  }

}
