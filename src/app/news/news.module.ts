import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [NewsComponent, TimeAgoPipe],
  exports: [NewsComponent, MatCardModule, MatButtonModule]
})
export class NewsModule { }
