import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { exhaustMap, map, take, tap } from "rxjs/operators";

import { UserService } from "../users/user.service";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";

@Injectable({ providedIn: "root" })
export class DataStorageService {
   constructor(
      private http: HttpClient,
      private userService: UserService,
      private authService: AuthService
   ) {}

   storeUsers() {
      const users = this.userService.getUsers();
      this.http
         .put(
            "https://ng-course-user-book-65f10.firebaseio.com/users.json",
            users
         )
         .subscribe((response) => {
            console.log(response);
         });
   }

   fetchUsers() {
      return this.authService.user.pipe(
         take(1),
         exhaustMap((user) => {
            return this.http.get<User[]>(
               "https://ng-course-user-book-65f10.firebaseio.com/users.json",
            );
         })
      );

      // return this.http
      //   .get<User[]>(
      //     'https://ng-course-user-book-65f10.firebaseio.com/users.json'
      //   )
      //   .pipe(
      //     map(users => {
      //       return users.map(user => {
      //         return {
      //           ...user,
      //           ingredients: user.ingredients ? user.ingredients : []
      //         };
      //       });
      //     }),
      //     tap(users => {
      //       this.userService.setUsers(users);
      //     })
      //   )
   }
}
