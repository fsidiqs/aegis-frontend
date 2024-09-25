import { NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthResponseData } from "src/app/auth/auth.service";

@Component({
   selector: "app-user-start",
   templateUrl: "./user-start.component.html",
   styleUrls: ["./user-start.component.css"],
})
export class UserStartComponent implements OnInit {
   isLoading = false;

   constructor() {}

   ngOnInit() {}

   onSubmit(form: NgForm) {
      if (!form.valid) {
         return;
      }

      const email = form.value.email;
      const password = form.value.password;

      let authObs: Observable<AuthResponseData>;

      this.isLoading = true;
      

      form.reset();
   }
}
