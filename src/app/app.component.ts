import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";

@Component({
   selector: "app-root",
   templateUrl: "./app.component.html",
   styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
   loadedFeature: string = "recipe";

   onNavigate(feature: string) {
      this.loadedFeature = feature;
   }

   constructor(private authService: AuthService) {}

   ngOnInit() {
      this.authService.autoLogin();
   }
}
