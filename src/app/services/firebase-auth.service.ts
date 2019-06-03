//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserService } from './user.service';
import { TranslateService } from "@ngx-translate/core";
//import { Observable } from 'rxjs';

@Injectable()
export class FirebaseAuthService {
  public tokens;
  public uid;
  public language;

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    public translateService: TranslateService
    ) { }

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        this.tokens = res["credential"];
        localStorage.setItem("credential", this.tokens);
        this.uid = res["user"]["uid"];
        localStorage.setItem("uid", this.uid);
        //subscribe to the user, translate it into readable JSON and get the language
        this.userService.getUser(this.uid).subscribe(res => {
          if (res.exists) {
            let doc = res.data();
            if (doc.language) {
              this.translateService.use('i18n/'+doc.language);
              this.language = doc.language;
              localStorage.setItem("language", this.language);
            } else {
              this.language = "en_EN";
              localStorage.setItem("language", this.language);
            }
          } else {
            // doc.data() will be undefined in this case
            console.log("Il documento non esiste");
          }
        })
      }).catch(err => {
        console.log("S'è scassato qualcosa con il login Google");
        console.log(err);
      })
    })
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }


}
