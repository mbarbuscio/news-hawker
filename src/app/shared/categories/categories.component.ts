import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private configService:ConfigService) { }

  selectedCategory:string = "general";
  categories = [
    'general',
    'business',
    'entertainment', 
    'health',
    'science', 
    'sports', 
    'technology'
  ]

  ngOnInit() {
  }

  updateCat() {
    this.configService.setCategory(this.selectedCategory);
  }
}
