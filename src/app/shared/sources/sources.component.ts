import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {

  separatorKeysCodes = [ENTER, COMMA];
  selectable: boolean = true;
  removable: boolean = true;
  sources: any[];
  selectedSources = [];

  constructor(private newService: NewsService, private configService: ConfigService) { 
    newService.getSources().subscribe(res => {
      this.sources = res;
      this.selectedSources = [];
      this.refreshSources();
    })
  }

  addSource(source) {
    if(!source.isSelected) {
      source.isSelected = true;
      this.selectedSources.push(source);
      this.refreshSources(); 
    }
  }

  remove(source: any): void {
    let index = this.selectedSources.indexOf(source);
    let oindex = this.sources.indexOf(source);

    if (index >= 0) {
      this.selectedSources.splice(index, 1);
    }

    if (oindex >= 0) {
      this.sources[oindex].isSelected = false;
    }
    this.refreshSources(); 
  }

  refreshSources() {
    this.configService.setSources(this.selectedSources);
  }

  ngOnInit() {
  }

}
