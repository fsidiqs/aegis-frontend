import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { ForgotPasswordService } from "./forgot-password.service";

@Component({
   selector: "app-forgot-password",
   templateUrl: "./forgot-password.component.html",
})
export class ForgotPasswordComponent {
   isLoading = false;
   error: string = "";

   constructor(
      private forgotPasswordService: ForgotPasswordService,
      private router: Router
   ) {}

   onSwitchToLogin() {
      this.router.navigate(["/auth"]);
   }

   onSwitchToSubmitPassword() {
      this.router.navigate(["/forgot-password/submit-new-password"]);
   }

   onSubmit(form: NgForm) {
      if (!form.valid) {
         return;
      }

      const email = form.value.email;

      this.isLoading = true;
      this.forgotPasswordService.sendForgotPasswordRequest(email).subscribe(
         (resData) => {
            this.isLoading = false;
            this.router.navigate(["/forgot-password/submit-new-password"]);
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
