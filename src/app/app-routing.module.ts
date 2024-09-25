import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { UsersComponent } from "./users/users.component";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { UserDetailComponent } from "./users/user-detail/user-detail.component";
import { UsersResolverService } from "./users/users-resolver.service";
import { UserStartComponent } from "./users/user-start/user-start.component";

const routes: Routes = [
   { path: "", redirectTo: "/users", pathMatch: "full" },
   {
      path: "users",
      component: UsersComponent,
      canActivate: [AuthGuard],
      children: [
         // { path: "", component: UserStartComponent },
         { path: "new", component: UserEditComponent },
         {
            path: ":id",
            component: UserDetailComponent,
            resolve: [UsersResolverService],
         },
         {
            path: ":id/edit",
            component: UserEditComponent,
            resolve: [UsersResolverService],
         },
      ],
   },
   // { path: "shopping-list", component: ShoppingListComponent },
   { path: "auth", component: AuthComponent },

];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
