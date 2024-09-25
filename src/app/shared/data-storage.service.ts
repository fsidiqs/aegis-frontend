import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { exhaustMap, map, take, tap } from "rxjs/operators";

import { UserService } from "../users/user.service";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { Organization } from "../organizations/organization.model";
import { OrganizationService } from "../organizations/organization.service";

export interface OrganizationResponseData {
   data: {
      id: string;
      creator_id: string;
      name: string;
      description: string;
   }[];
}

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
      private organizationService: OrganizationService,
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
         });
   }

   updateUser(userID: string, email: string, name: string, role: string, password: string) {
      return this.http
         .put<UserResponseData>(
            "http://localhost:8080/consumer/v1/user/" + userID,
            {
               email: email,
               name: name,
               role: role,
               password: password,
            }
         )
         .subscribe(() => {
            this.fetchUsers().subscribe();
         });
   }

   postUser(email: string, name: string, role: string, password: string) {
      return this.http
         .post<UserResponseData>("http://localhost:8080/consumer/v1/user", {
            email: email,
            name: name,
            role: role,
            password: password,
         })
         .subscribe(() => {
            this.fetchUsers().subscribe();
         });
   }

   deleteUser(userID: string) {
      return this.http
         .delete<UserResponseData>("http://localhost:8080/consumer/v1/user/" + userID)
         .subscribe(() => {
            this.fetchUsers().subscribe();
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



   fetchOrganizations() {
      return this.http
         .get<OrganizationResponseData>("http://localhost:8080/consumer/v1/organizations")
         .pipe(
            map((organization) => {
               
               return organization.data.map((organization) => {
                  return new Organization(
                     organization.id,
                     organization.name,
                     organization.description,
                     organization.creator_id
                  );
               });
            }),
            tap((organization) => {
               console.log("testing")
               console.log(organization)
               this.organizationService.setOrganizations(organization);
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

   deleteOrganization(organizationID: string) {
      return this.http
         .delete<OrganizationResponseData>("http://localhost:8080/consumer/v1/organization/" + organizationID)
         .subscribe(() => {
            this.fetchOrganizations().subscribe();
         });
   }

   updateOrganization(organizationID: string, name: string, description: string) {
      return this.http
         .put<UserResponseData>(
            "http://localhost:8080/consumer/v1/organization/" + organizationID,
            {
               name: name,
               description: description,
            }
         )
         .subscribe(() => {
            this.fetchOrganizations().subscribe();
         });
   }

   postOrganization(name: string, description: string) {
      return this.http
         .post<OrganizationResponseData>("http://localhost:8080/consumer/v1/organization", {
            name: name,
            description: description
         })
         .subscribe(() => {
            this.fetchOrganizations().subscribe();
         });
   }
}
