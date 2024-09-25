import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { exhaustMap, map, take, tap } from "rxjs/operators";

import { UserService } from "../users/user.service";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";

export interface UserResponseData {
   data: {
      email: string;
      id: string;
      role: string;
      name: string;
      token: string;
      tokenExpirationDate: string;
   }[];
}

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
      return this.http
         .get<UserResponseData>("http://localhost:8080/consumer/v1/users")
         .pipe(
            map((user) => {
               return user.data.map((user) => {
                  return new User(
                     user.email,
                     user.id,
                     user.role,
                     user.name,
                     user.token,
                     new Date(user.tokenExpirationDate)
                  );
               });
            }),
            tap((users) => {
               this.userService.setUsers(users);
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
