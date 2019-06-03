import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { LoadingService } from 'app';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  user: any = {}
  isLoading: boolean;


  userCollection: AngularFirestoreCollection<any>;
  userObservableList: Observable<any[]>
  uid;

  //userRef: AngularFireList<any> = null;

  tokens;

  constructor(
    //private auth: AuthService,
    public afAuth: FirebaseAuthService, //my FB Service
    public auth: AngularFireAuth,
    //private afs: AngularFirestore,
    private loadingService: LoadingService,
    private toaster: ToastrService,
    private router: Router,
    private userService: UserService
  ) { }



  googleLogin() {
    this.loadingService.start();
    this.afAuth.doGoogleLogin()
    .then(r => {
      this.loadingService.stop();
      console.log(r);
      localStorage.setItem('uid', JSON.stringify(r.user.uid));
      this.router.navigate(['/calendar']);
    })
    .catch(err => {
      this.loadingService.stop();
      this.toaster.error(err);
    }); 
  }

  googleRegistration() {
    this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((suc) => {
      console.log(suc);
      localStorage.setItem('uid', suc.user.uid);
      localStorage.setItem('language', "en_EN");
      var user = {
        uid:  suc.user.uid,
        email:  suc.user.email,
        photoURL: suc.user.photoURL,
        displayName: suc.user.displayName,
        language: "en_EN",
        password: "password"
      }
      this.userService.createUser(user).then(()=> this.router.navigate(['/calendar']));
      //this.userCollection.doc(suc.user.uid).set(user).then(()=> this.navCtrl.setRoot('HomePage'));

      /* this.userService.createUser(user).then(() =>
        this.router.navigate(['/calendar'])
      ) */
    })
  }

  webGoogleLogin() {
    this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res =>{
      console.log(res);
      /* const docData = {
        userEmail: res.user['email'],
        userDisplayName: res.user['displayName'],
        userUid: res.user['uid'],
      }; */
      localStorage.setItem('uid', res.user.uid);
    }).catch(function (err) {
      this.toaster.error(err);
    });
   }

}
