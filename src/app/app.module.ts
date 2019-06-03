import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LaddaModule } from 'angular2-ladda';
import { MomentModule } from 'angular2-moment';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthService, TranslationsUrl } from 'app';
//import { AuthInterceptor} from 'app';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSpinnerModule } from 'ngx-spinner';

//TADABOARD REBOARD
import { LinesCompleteChartModule } from 'reboard-angular/app/lines-complete-chart/lines-complete-chart.module';
//import WidgetDirective from 'tadaboard-bus/src/angular/widget-directive';

//FIREBASE
//Import { AngularFireModule } from 'angularfire2'; OLD ONE
//import { AngularFirestoreModule } from 'angularfire2/firestore';
//import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from './services/firebase-credentials';

// GUARD
import { AuthGuardService } from './guards/auth.guard';

// VIEWS
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ComponentsComponent } from './views/components/components.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { AdminComponent } from './views/admin/admin.component';
import { AdminEditComponent } from './views/admin/edit/admin-edit.component';
import { AdminNewComponent } from './views/admin/new/admin-new.component';
import { CharComponent } from './views/game/char/char.component';
import { GameComponent } from './views/game/game/game.component';

// C0MPONENTS
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading-spinner/loading.component';
import { TreeStructureComponent } from './components/tree-structure/tree-structure.component';
import { AnimateComponent } from './components/animate/animate.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { TaskBarComponent } from './components/task-bar/task-bar.component';
import { HitMallComponent } from './components/hit-mall/hit-mall.component';
import { OverlayScreensComponent } from './components/screens-overlay/screens-overlay.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { SpriteAnimation } from './components/sprite-animation/sprite-animation.component';

// SERVICES
import { LoadingService } from './services/loading.service';
import { ApiService } from './services/api.service';
import { TimingService } from './services/timing.service';
import { FirebaseAuthService } from './services/firebase-auth.service';

import { FireServiceProvider } from './services/firebase.service';
import { UserService } from './services/user.service';
import * as firebase from 'firebase';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `${TranslationsUrl}/`, '');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ComponentsComponent,
    CalendarComponent,
    AdminComponent,
    AdminEditComponent,
    AdminNewComponent,
    CharComponent,
    GameComponent,

    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    TreeStructureComponent,
    AnimateComponent,
    ScheduleComponent,
    TaskBarComponent,
    HitMallComponent,
    OverlayScreensComponent,
    CountdownComponent,
    SpriteAnimation

    //WidgetDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    routing,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    LaddaModule,
    MomentModule,
    ToastrModule.forRoot({
      positionClass: 'toast-center' // custom class
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FontAwesomeModule,
    NgxSpinnerModule,

    LinesCompleteChartModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features

  ],
  providers: [
    ApiService,
    AuthService,
    LoadingService,
    TimingService,
   // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    FirebaseAuthService,
    FireServiceProvider,
    UserService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
