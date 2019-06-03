import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

  constructor(
  ) {
  }

  /* getOptions() {
    let headers = new HttpHeaders();
    if (this.tokens.accessToken) {
      headers = headers.append(
        "Authorization",
        `Bearer: ${this.tokens.accessToken}`
      );
    }
    return { headers };
  } */

  /* isAuthenticated() {
    if (!this.uid) {
      if (localStorage.getItem("uid")) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } */

  /* setAdminPassword() {
    localStorage.setItem("admin", "true");
  }

  deleteAdminPassword() {
    localStorage.setItem("admin", "false");
  } */
}
