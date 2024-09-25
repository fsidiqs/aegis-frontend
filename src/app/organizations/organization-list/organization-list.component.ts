import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { OrganizationService } from '../organization.service';
import { Organization } from 'src/app/organizations/organization.model';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit, OnDestroy {
  organizations: Organization[] = [];
  subscription: Subscription = new Subscription;

  constructor(private organizationService: OrganizationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.organizationService.organizationsChanged
      .subscribe(
        (organizations: Organization[]) => {
          this.organizations = organizations;
        }
      );
    
    this.organizations = this.organizationService.getOrganizations();
   
  }

  onNewOrganization() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
