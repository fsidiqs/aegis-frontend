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
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
   // kind: string;
   // idToken: string;
   // email: string;
   // refreshToken: string;
   // expiresIn: string;
   // localId: string;
   // registered?: boolean;
   data: {
      auth_token: string;
      // email: string;
      // localId: string;
      // idToken: string;
      // expiresIn: string;
   };
}

@Injectable({ providedIn: "root" })
export class AuthService {
   user = new BehaviorSubject<User>(null);
   private tokenExpirationTimer: any;

   constructor(private http: HttpClient, private router: Router) {}
   signup(email: string, password: string) {
      //   return this.http
      //      .post<AuthResponseData>("http://localhost:3000/api/user/signup", {
      //         email: email,
      //         password: password,
      //      })
      //      .pipe(
      //         catchError(this.handleError),
      //         tap((resData) => {
      //            this.handleAuthentication(
      //               resData.email,
      //               resData.localId,
      //               resData.idToken,
      //               +resData.expiresIn
      //            );
      //         })
      //      );
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

   login(email: string, password: string) {
      return this.http
         .post<AuthResponseData>(
            "http://localhost:8080/consumer/v1/auth/login",
            {
               email: email,
               password: password,
               //    returnSecureToken: true,
            }
         )
         .pipe(
            catchError(this.handleError),
            tap((resData) => {
               this.handleAuthentication(
                  resData.data.auth_token
                  // resData.email,
                  // resData.localId,
                  // resData.idToken,
                  // +resData.expiresIn
               );
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

   autoLogin() {
      const userData: User = JSON.parse(
         localStorage.getItem("userData") || "{}"
      );
      if (!userData) {
         return;
      }

      const loadedUser = new User(
         userData.email,
         userData.id,
         userData.name,
         userData.role,
         userData.token,
         new Date(userData.tokenExpirationDate)
      );

      if (loadedUser.token) {
         this.user.next(loadedUser);
         const expirationDuration =
            new Date(userData.tokenExpirationDate).getTime() -
            new Date().getTime();
         this.autoLogout(expirationDuration);
      }
   }

   logout() {
      this.user.next(null);
      this.router.navigate(["/auth"]);
      localStorage.removeItem("userData");
      if (this.tokenExpirationTimer) {
         clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
   }

   autoLogout(expirationDuration: number) {
      this.tokenExpirationTimer = setTimeout(() => {
         this.logout();
      }, expirationDuration);
   }

   private handleAuthentication(
      // email: string,
      // userId: string,
      token: string
      // expiresIn: number
   ) {
      const expirationDate = new Date(
         new Date().getTime() + 7 * 24 * 60 * 60 * 1000
      );
      // const user = new User(email, userId, token, expirationDate);
      const user = new User(
         "email",
         "userId",
         "user",
         "a user",
         token,
         expirationDate
      );
      this.user.next(user);
      // this.autoLogout(expiresIn * 1000);
      localStorage.setItem("userData", JSON.stringify(user));
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
