import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { HeaderComponent } from "./header/header.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { AuthComponent } from "./auth/auth.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { UsersComponent } from "./users/users.component";
import { UserListComponent } from "./users/user-list/user-list.component";
import { UserDetailComponent } from "./users/user-detail/user-detail.component";
import { UserItemComponent } from "./users/user-list/user-item/user-item.component";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { UserService } from "./users/user.service";
import { OrganizationsComponent } from "./organizations/organizations.component";
import { OrganizationListComponent } from "./organizations/organization-list/organization-list.component";
import { OrganizationDetailComponent } from "./organizations/organization-detail/organization-detail.component";
import { OrganizationItemComponent } from "./organizations/organization-list/organization-item/organization-item.component";
import { OrganizationService } from "./organizations/organization.service";
import { OrganizationEditComponent } from "./organizations/organization-edit/organization-edit.component";
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";
import { ForgotPasswordService } from "./auth/forgot-password/forgot-password.service";
import { SubmitPasswordService } from "./auth/forgot-password/submit-password/submit-password.service";
import { SubmitPasswordComponent } from "./auth/forgot-password/submit-password/submit-password.component";

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      UsersComponent,
      UserListComponent,
      UserDetailComponent,
      UserItemComponent,
      OrganizationsComponent,
      OrganizationListComponent,
      OrganizationDetailComponent,
      OrganizationItemComponent,
      OrganizationEditComponent,
      ForgotPasswordComponent,
      SubmitPasswordComponent,
      // ShoppingListComponent,
      // ShoppingEditComponent,
      DropdownDirective,
      // RecipeStartComponent,
      UserEditComponent,
      AuthComponent,
      LoadingSpinnerComponent,
   ],
   imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule,
   ],
   providers: [
      UserService,
      OrganizationService,
      ForgotPasswordService,
      SubmitPasswordService,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptorService,
         multi: true,
      },
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}
