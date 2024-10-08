import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
   selector: "app-auth",
   templateUrl: "./auth.component.html",
})
export class AuthComponent {
   isLoginMode = true;
   isLoading = false;
   error: string = "";

   constructor(private authService: AuthService, private router: Router) {}

   onSwitchToForgotPassword() {
      this.router.navigate(["/forgot-password"]);
   }

   onSubmit(form: NgForm) {
      if (!form.valid) {
         return;
      }

      const email = form.value.email;
      const password = form.value.password;

      let authObs: Observable<AuthResponseData>;

      this.isLoading = true;
      if (this.isLoginMode) {
         this.authService.login(email, password).subscribe(
            (resData) => {
               this.isLoading = false;
               this.router.navigate(["/users"]);
            },
            (errorMessage) => {
               this.error = errorMessage;
               this.isLoading = false;
            }
         );
      } 
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
