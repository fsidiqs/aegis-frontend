import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
   BehaviorSubject,
   catchError,
   delay,
   of,
   Subject,
   tap,
   throwError,
   timeout,
} from "rxjs";
import { Router } from "@angular/router";

export interface SubmitPasswordResponseData {
   
   data: {
      auth_token: string;
      // email: string;
      // localId: string;
      // idToken: string;
      // expiresIn: string;
   };
}

@Injectable({ providedIn: "root" })
export class SubmitPasswordService {

   constructor(private http: HttpClient, private router: Router) {}
 

   sendNewPasswordRequest(email: string, password: string, otp: string) {
      return this.http
         .post<SubmitPasswordResponseData>(
            "http://localhost:8080/consumer/v1/user/forgot-password/update-using-otp",
            {
               email: email,
               password: password,
               otp: otp,
            }
         )
         .pipe(
            catchError(this.handleError),
            tap((resData) => {
               console.log("successfully send new password ")
               console.log(resData);
            })
         );

      // const mockResponse: AuthResponseData = {
      //    kind: "identitytoolkit#SignupNewUserResponse",
      //    idToken: "mock-id-token",
      //    email: email,
      //    refreshToken: "mock-refresh-token",
      //    expiresIn: "3600",
      //    localId: "mock-local-id",
      // };

      // Return the hardcoded response as an observable using of()
      // return of(mockResponse).pipe(delay(2000));
   }

 

  

 

   private handleError(errorRes: HttpErrorResponse) {
      let errorMessage = "An unknown error occurred!";
      if (!errorRes.error || !errorRes.error.error) {
         return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
         case "EMAIL_EXISTS":
            errorMessage = "This email exists already";
            break;
         case "EMAIL_NOT_FOUND":
            errorMessage = "This email does not exist.";
            break;
         case "INVALID_PASSWORD":
            errorMessage = "This password is not correct.";
            break;
      }
      return throwError(errorMessage);
   }
}
