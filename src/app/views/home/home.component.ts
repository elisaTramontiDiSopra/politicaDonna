import { Component } from '@angular/core';
import { ApiService } from 'app/services/api.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  public fullData;
  public totalCandidates;
  public totalFemalesCandidates;
  public totalMalesCandidates

  constructor(public api: ApiService  ) {
  }



  ngOnInit() {
    this.api.loadOpenData(2016).subscribe(
      response => {
        this.totalCandidates = response.lenght;
        this.totalFemalesCandidates = response.filter(d => d["genere"] === "F").length;
        this.totalMalesCandidates = response.filter(d => d["genere"] === "M").length;

        this.fullData = response;
        //this.drugs = response.data.sort((a, b) => a.name.localeCompare(b.name));
      }
    );
  }
}
