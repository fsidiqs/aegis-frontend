import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { OrganizationService } from './organization.service';
import { Organization } from '../organizations/organization.model';

@Injectable({ providedIn: 'root' })
export class OrganizationsResolverService implements Resolve<Organization[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private organizationsService: OrganizationService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const organizations = this.organizationsService.getOrganizations();

    if (organizations.length === 0) {
      return this.dataStorageService.fetchOrganizations();
    } else {
      return organizations;
    }
  }
}
