import { Component } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { FVG_URLS } from 'app/constants';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { elementContainerEnd } from '@angular/core/src/render3';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  //total vars
  public totalCandidates = 0; public totalFemalesCandidates = 0; public totalMalesCandidates = 0;
  //year slider vars
  //public startingYear = '2016'; public endingYear = '2019';
  public currentYear = 2016;

  public mayors = {};
  public ongoingMayor = {};
  public elected = [];
  //public allYearsVotingResults = {};
  public allYearsBallotingResults = {};
  /* public emptyOngoingMayorModel = {
    'nomeComune': '',
    'candidati': [],
    'eletto': '',
    'genereEletto': '',
  } */
  public totals = { totalCandidatesF: 0, totalCandidatesNumber: 0 }; //plus the years specifcs

  constructor(public api: ApiService) { }


  ngOnInit() {
    this.loadOpenData(FVG_URLS);
  }

  loadOpenData(urls) {
    let promisesArray = this.createThePromiseArray(urls);
    Promise.all(promisesArray).then(value => {
      return value.filter(c => c !== 'ballottaggio') //cleaned resuls
    }).then(v => {
      v.forEach(yearObject => {
        this.findMayor(yearObject)
      })
    });
  }

  createThePromiseArray(urls) {
    //return promiseArray
    return urls.map((element) => {
      let ballotting = element[1].length === 5;
      let year = ballotting === true ? element[1].slice(0, -1) : element[1];
      return new Promise((resolve, reject) => {
        this.api.loadOpenData(element[0]).subscribe(response => {
          let cleanedResponse = [];
          cleanedResponse = this.cleanResponse(response, year);   // delete unuseful data
          cleanedResponse = _.groupBy(cleanedResponse, 'comune');
          //se sono ballottaggi mettili in una variabile temporanea diversa ed esci,
          //se sono voti al primo turno salva tutto e cerca il sindaco
          if (ballotting) {
            this.allYearsBallotingResults[year] = cleanedResponse;
            resolve("ballottaggio");
          }
          resolve(cleanedResponse);
        });
      });
    });
  }

  findMayor(allTownCandidates) {
    for (let town in allTownCandidates) {
      let whereToLookForTheElected = allTownCandidates[town];
      let year = whereToLookForTheElected[0].anno;
      this.mayors[year] === undefined ? this.mayors[year] = {} : this.mayors[year]
      let ballottingValue = false;
      //if the value is inside the ballotting array then look for it there
      //otherwise is a regular election
      //this fixes the problem of calculating population and votes relying on the region results
      if (this.allYearsBallotingResults[year][town]) {
        whereToLookForTheElected = this.allYearsBallotingResults[year][town];
        ballottingValue = true;
      }

      this.findElected(whereToLookForTheElected).then((elected) => {
        //save all candidates and results of an election inside mayors array divided by year
        this.createMayorArray(town, year, elected, allTownCandidates[town], ballottingValue)
        //save only the last election to have the current mayor in ongoingMayors
        this.createOngoingMayorsArray(town, year, elected);
        this.calculatingTotals(year, town);
      })
    }
  }

  async findElected(whereToLookForTheElected) {
    return _.maxBy(whereToLookForTheElected, c => c['voti'])
  }

  createMayorArray(town, year, elected, allTownCandidates, ballottingValue) {
    this.mayors[year][town] = {
      candidati: allTownCandidates,
      candidatesNumber: allTownCandidates.length,
      candidatesF: allTownCandidates.filter(c => c.genere === 'F').length,
      eletto: elected,
      ballottaggio: ballottingValue,
      anno: year,
    };
  }
  createOngoingMayorsArray(town, year, elected) {
    if (this.ongoingMayor[town] && this.ongoingMayor[town]['anno'] > year) { return }
    /* switch (elected.provincia) {
      case "Pordenone":
        elected.provincia = "PN"
        break
      case "Udine":
        elected.provincia = "UD"
        break
      case "Gorizia":
        elected.provincia = "GO"
        break
      case "Trieste":
        elected.provincia = "TS"
        break
    } */

    this.ongoingMayor[town] = {
      anno: year,
      eletto: elected.nome + " " + elected.cognome,
      elettoGenere: elected.genere,
      comune: town,
      provincia: elected.provincia

    }
  }
  cleanResponse(response, year) {
    return response.map((e, i) => {
      return {
        nome: e.nome,
        cognome: e.cognome,
        voti: e.voti,
        genere: e.genere,
        provincia: e.provincia,
        comune: e.comune,
        anno: year
      }
    })
  }

  calculatingTotals(year, town) {
    this.totals[year] === undefined ? this.totals[year] = { candidatesF: 0, candidatesNumber: 0 } : this.totals[year]
    this.totals['totalCandidatesF'] = this.totals.totalCandidatesF + this.mayors[year][town].candidatesF,
      this.totals['totalCandidatesNumber'] = this.totals.totalCandidatesNumber + this.mayors[year][town].candidatesNumber,
      this.totals[year]['candidatesF'] = this.totals[year]['candidatesF'] + this.mayors[year][town].candidatesF;
    this.totals[year]['candidatesNumber'] = this.totals[year]['candidatesNumber'] + this.mayors[year][town].candidatesNumber;
  }

  changeYear(selectedYear) {
    this.currentYear = selectedYear;
  }
}
