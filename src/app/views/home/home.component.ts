import { Component } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { FVG_URLS } from 'app/constants';
import * as _ from 'lodash';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  public fullData;
  public totalCandidates = 0;
  public totalFemalesCandidates = 0;
  public totalMalesCandidates = 0;
  public initialYear = 2017;
  public ongoingMayors = {};
  public allYearsVotingResults = {};
  public allYearsBallotingResults = {};
  public emptyOngoingMayorModel = {
    'nomeComune': '',
    'candidati': [],
    'eletto': '',
    'genereEletto': '',
  }

  constructor(public api: ApiService) { }



  ngOnInit() {
    this.loadOpenData(FVG_URLS);
  }

  loadOpenData(urls) {
    urls.forEach((element) => {
      this.api.loadOpenData(element[0]).subscribe(
        response => {
          console.log(response);
          let year = element[1].slice(0,-1);  //I'm gonna use it just if it is a b url,
          let cleanedResponse = [];
          cleanedResponse = this.cleanResponse(response);         // delete unuseful data
          cleanedResponse = _.groupBy(cleanedResponse, 'comune'); // group by town
          //se sono ballottaggi mettili in una variabile temporanea diversa ed esci,
          //se sono voti al primo turno salva tutto e cerca il sindaco
          if (element[1].slice(-1) === 'b') {
            return this.allYearsBallotingResults[year] = cleanedResponse
          }
          this.findTheMayors(cleanedResponse, element[1]);
        }
      );
    });
  }

  cleanResponse(response) {
     return response.map((e, i) => {
      return {
        nome: e.nome,
        cognome: e.cognome,
        voti: e.voti,
        genere: e.genere,
        provincia: e.provincia,
        comune: e.comune
      }
    })
  }

  findTheMayors(allTownCandidates, year) {
    this.ongoingMayors[year] === undefined ? this.ongoingMayors[year] = {} : this.ongoingMayors[year]
    for (let town in allTownCandidates) {
      let whereToLookForTheElected = allTownCandidates[town];
      let ballottingValue = false;
      //se ci sono >2 candidati c'e' ballottaggio quindi cerco l'eletto tra i ballottaggi
      if (allTownCandidates[town].length > 2) {
        whereToLookForTheElected = this.allYearsBallotingResults[year][town];
        ballottingValue = true;
      }
      this.ongoingMayors[year][town] = {
        candidati: allTownCandidates[town],
        eletto: _.maxBy(whereToLookForTheElected, c => c['voti']),
        ballottaggio: ballottingValue
      }
    }
  }
}
