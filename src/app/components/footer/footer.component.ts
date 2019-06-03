import { Component, ViewChild, Input } from "@angular/core";
import { UserService } from "app/services/user.service";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Router } from "@angular/router";

@Component({
  styleUrls: ["./footer.component.sass"],
  templateUrl: "./footer.component.html",
  selector: "app-footer"
})
export class FooterComponent {
  @ViewChild("passwordModal") public passwordModal: ModalDirective;
  @Input() uid: any;

  adminPassword;
  passwordType = "password";
  showAlert = false;

  constructor(public router: Router, private userService: UserService) {
    this.uid = this.userService.getUid();
  }

  enterAdminMode() {
    let adminPw = this.adminPassword;
    this.userService.getUser(this.uid).subscribe(res => {
      if (res.exists) {
        let doc = res.data();
        if (adminPw === doc.password) {
          this.passwordModal.hide();
          this.router.navigate(['/admin']);
        } else {
          this.showAlert = true;
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }

  goTo(page) {
    let goPage = "/"+page
    this.router.navigate([goPage]);
  }

}
