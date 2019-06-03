import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { trigger, style, animate, transition, keyframes, query, stagger} from "@angular/animations";

import Dashboard from "tadaboard-bus/src/dashboard";

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
  animations: [
    trigger("slideInDown", [
      transition("* => *", [
        query(":enter", style({ opacity: 0 }), { optional: true }),
        query(
          ":enter",
          stagger("120ms", [
            animate(
              "0.5s ease-in",
              keyframes([
                style({ opacity: 0, transform: "translateY(-25%)", offset: 0 }),
                style({ opacity: 0.5, transform: "translateY(10px)", offset: 0.3 }),
                style({ opacity: 1, transform: "translateY(0)", offset: 1.0 })
              ])
            )
          ]),
          { optional: true }
        ),
        query(
          ":leave",
            animate(
              "0.3s ease-in",
              keyframes([
                style({ opacity: 1, offset: 0 }),
                style({ opacity: 0, offset: 1.0 })
              ])
            ),
          { optional: true }
        )
      ])
    ]),
    trigger("fadeIn", [
      transition("* => *", [
        query(":enter", style({ opacity: 0 }), { optional: true }),
        query(
          ":enter",
            animate(
              "1.5s 0.5s ease-in",
              keyframes([
                style({ opacity: 0, offset: 0 }),
                style({ opacity: 1, offset: 1.0 })
              ])
            ),
          { optional: true }
        )
      ])
    ])
  ]
})
export class AdminComponent {
  changePassword = false;
  passwordType = "password";
  radioNotTouched = true;
  uid;
  selectedLanguage;
  newPassword;
  passwordUpdatedMsg = false;
  wannaChangePasswod = true;

  availableLanguages = [
    {name: "italian", value: "it_IT", label: "Italiano"},
    {name: "english", value: "en_EN", label: "English"},
  ];

  linesConfig = {
    scales: { x: { type: 'time' }, y: { domainZero: true }, color: { type: 'ordinal', range: ['#fddd62', '#ddd'] } },
    axes: { x: { tickNum: 4, tickFormat: '{M(x)}' }, y: { tickNum: 3, tickFormat: '{N(y)}' } },
    tooltip: { visible: true, textFormat: '<div class="h3">{N($y, "0")}</div>' }
  }

  //x = weex | y = answers
  lineChartData = [
    { "x": 1511272800000, "y": 12, color: "done" },
    { "x": 1511276400000, "y": 14, color: "done" },
    { "x": 1511280000000, "y": 11, color: "done"  },
    { "x": 1511272800000, "y": 16, color: "total" },
    { "x": 1511276400000, "y": 16, color: "total" },
    { "x": 1511280000000, "y": 16, color: "total"  },
  ]

  constructor(
    private userService: UserService,
    private translateService: TranslateService
  ) {
    this.uid = localStorage.getItem("uid");
    this.selectedLanguage = localStorage.getItem("language");
    console.log(this.selectedLanguage)
  }

  changePasswordVisibility() {
    this.passwordType ==="password"  ? this.passwordType="text" : this.passwordType="password";
  }

  changeSelectedLanguage() {
    //select my user collection and change the value of key language
    this.translateService.use('i18n/'+this.selectedLanguage+'.json');
    this.userService.updateUser(this.uid, "language", this.selectedLanguage);
    localStorage.setItem("language", this.selectedLanguage);
  }


  changeAdminPassword() {
    //select my user collection and change the value of key language
    this.userService.updateUser(this.uid, "password", this.newPassword).then(() => {
      this.changePassword = false;
    }).then(() => {
      setTimeout(() => {
        this.passwordUpdatedMsg = true;
      }, 300);
    });
  }
}
