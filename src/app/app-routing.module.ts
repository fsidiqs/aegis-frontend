import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { UsersComponent } from "./users/users.component";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { UserDetailComponent } from "./users/user-detail/user-detail.component";
import { UsersResolverService } from "./users/users-resolver.service";
import { UserStartComponent } from "./users/user-start/user-start.component";
import { OrganizationsComponent } from "./organizations/organizations.component";
import { OrganizationDetailComponent } from "./organizations/organization-detail/organization-detail.component";
import { OrganizationsResolverService } from "./organizations/organizations-resolver.service";
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";
import { OrganizationEditComponent } from "./organizations/organization-edit/organization-edit.component";
import { SubmitPasswordComponent } from "./auth/forgot-password/submit-password/submit-password.component";

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
   {
      path: "organizations",
      component: OrganizationsComponent,
      canActivate: [AuthGuard],
      children: [
         // { path: "", component: UserStartComponent },
         { path: "new", component: OrganizationEditComponent },
         {
            path: ":id",
            component: OrganizationDetailComponent,
            resolve: [OrganizationsResolverService],
         },
         {
            path: ":id/edit",
            component: OrganizationEditComponent,
            resolve: [OrganizationsResolverService],
         },
      ],
   },
   // { path: "shopping-list", component: ShoppingListComponent },
   { path: "auth", component: AuthComponent },
   { path: "forgot-password", component: ForgotPasswordComponent },
   { path: "forgot-password/submit-new-password", component: SubmitPasswordComponent },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
