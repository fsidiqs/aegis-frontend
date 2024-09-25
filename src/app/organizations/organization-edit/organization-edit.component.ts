import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
   FormGroup,
   FormControl,
   FormArray,
   Validators,
   ReactiveFormsModule,
} from "@angular/forms";

import { OrganizationService } from "../organization.service";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Organization } from "src/app/organizations/organization.model";

@Component({
   selector: "app-organization-edit",
   templateUrl: "./organization-edit.component.html",
   styleUrls: ["./organization-edit.component.css"],
})
export class OrganizationEditComponent implements OnInit {
   id!: string;
   editMode = false;
   organizationForm!: FormGroup;

   constructor(
      private route: ActivatedRoute,
      private organizationService: OrganizationService,
      private dataStorageService: DataStorageService,
      private router: Router
   ) {}

   ngOnInit() {
      this.route.params.subscribe((params: Params) => {
         this.id = params["id"];
         this.editMode = params["id"] != null;
         this.initForm();
      });
   }

   onSubmit() {
      const newOrganization = new Organization(
         "",
         this.organizationForm.value["name"],
         this.organizationForm.value["description"],
         ""
      );
      if (this.editMode) {
         this.dataStorageService.updateOrganization(
            this.id,
            newOrganization.name,
            newOrganization.description
         );
      } else {
         this.dataStorageService.postOrganization(
            newOrganization.name,
            newOrganization.description
         );
      }
      this.onCancel();
   }

   onCancel() {
      this.router.navigate(["../"], { relativeTo: this.route });
   }

   private initForm() {
      let organizationName = "";
      let organizationDescription = "";

      const organization = this.organizationService.getOrganization(this.id);
      organizationName = organization.name;
      organizationDescription = organization.description;
      this.organizationForm = new FormGroup({
         name: new FormControl(organizationName, Validators.required),
         description: new FormControl(
            organizationDescription,
            Validators.required
         ),
         // ingredients: organizationIngredients
      });
   }

   // get ingredientControls() {
   //   return (this.organizationForm.get('ingredients') as FormArray).controls;
   // }
}
