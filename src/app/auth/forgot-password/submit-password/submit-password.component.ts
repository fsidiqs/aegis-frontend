import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { SubmitPasswordService } from "./submit-password.service";

@Component({
   selector: "app-submit-password",
   templateUrl: "./submit-password.component.html",
})
export class SubmitPasswordComponent {
   isLoading = false;
   error: string = "";

   constructor(
      private submitPasswordService: SubmitPasswordService,
      private router: Router
   ) {}

   onSwitchToLogin() {
      this.router.navigate(["/auth"]);
   }

   onSubmit(form: NgForm) {
      if (!form.valid) {
         return;
      }

      const email = form.value.email;
      const password = form.value.password;
      const otp = form.value.otp;

      this.isLoading = true;
      this.submitPasswordService
         .sendNewPasswordRequest(email, password, otp)
         .subscribe(
            (resData) => {
               this.isLoading = false;
               this.router.navigate(["/auth"]);
            },
            (errorMessage) => {
               this.error = errorMessage;
               this.isLoading = false;
            }
         );
      // else {
      //    this.authService.signup(email, password).subscribe(
      //       (resData) => {
      //          console.log(resData);
      //          this.isLoading = false;
      //          this.router.navigate(["/users"]);

      //       },
      //       (errorMessage) => {
      //          console.log(errorMessage);
      //          this.error = errorMessage;
      //          this.isLoading = false;

      //       }
      //    );
      // }

      form.reset();
   }
}
