import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import "../style/global.sass";
import * as firebase from "firebase";
import firestore from "firebase/firestore";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  showFooter = true;

  /* changeState(state: any) {
    this.toState = state;
  }

 */
  constructor(translateService: TranslateService, public router: Router,) {
    // this language will be used as a fallback when a translation isn't found in the current language
    //translateService.setDefaultLang('en');

    //set ENG as default lang
    translateService.use('i18n/en_EN.json');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    //translateService.use('en');

    //check for the language stored locally
    let language = localStorage.getItem("language");
    if (language) {
      translateService.use('i18n/'+language+'.json');
    }

    //check for the user stored locally
    var uid = localStorage.getItem("uid");

    //if I'm on login or on empty url hide footer
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/login' || event.urlAfterRedirects === '/') {
          this.showFooter = false;
        } else {
          this.showFooter = true;
        }
      })
  }


}
