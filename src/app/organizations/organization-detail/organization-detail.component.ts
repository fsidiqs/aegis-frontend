import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { OrganizationService } from '../organization.service';
import { Organization } from 'src/app/organizations/organization.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {
  organization!: Organization;
  id!: string;

  constructor(private organizationService: OrganizationService,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.organization = this.organizationService.getOrganization(this.id);
        }
      );
  }

  // onAddToShoppingList() {
  //   this.organizationService.addIngredientsToShoppingList(this.organization.ingredients);
  // }

  onEditOrganization() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteOrganization() {
    // this.organizationService.deleteOrganization(this.id);
    this.dataStorageService.deleteOrganization(this.id)
    this.router.navigate(['/organizations']);
  }

}
