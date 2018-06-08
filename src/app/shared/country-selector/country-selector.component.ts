import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { Country } from '../../models/country';
import { ConfigService } from '../../services/config.service';


@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss']
})
export class CountrySelectorComponent implements OnInit, OnDestroy {

  countrySub: Subscription;
  countries: Observable<any[]>;
  selectedCountry: Country;

  constructor(db: AngularFirestore, private configService: ConfigService) {
    this.countries = db.collection('countries').valueChanges();
    this.countrySub = configService.getCountry().subscribe((c)=> {
      this.selectedCountry = c;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.countrySub.unsubscribe();
  }

  flagUrl(flagCd) {
    var url = "http://www.countryflags.io/"+flagCd+"/flat/64.png";
    return url;
  }

  setCountry(country) {
    this.configService.setCountry(country);
  }
}
