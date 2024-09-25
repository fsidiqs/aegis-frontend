import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Organization } from './organization.model';

@Injectable()
export class OrganizationService {
  organizationsChanged = new Subject<Organization[]>();

  // private organizations: Organization[] = [
  //   new Organization(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Organization(
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //   )
  // ];
  private organizations: Organization[] = [];

  constructor() {

  }

  setOrganizations(organizations: Organization[]) {
    this.organizations = organizations;
    this.organizationsChanged.next(this.organizations.slice());
  }

  getOrganizations() {
    return this.organizations.slice();
  }

  getOrganization(index: string) {
    return this.organizations.find((organization) => organization.id === index);
  }

  // addIngredientsToShoppingList(ingredients: Ingredient[]) {
  //   this.slService.addIngredients(ingredients);
  // }

  addOrganization(organization: Organization) {
    // this.organizations.push(organization);
    // this.dataStorageService.postOrganization(organization.email, organization.name, organization.role, organization.password).subscribe();
    this.organizationsChanged.next(this.organizations.slice());
  }

  updateOrganization(index: number, newOrganization: Organization) {
    this.organizations[index] = newOrganization;
    this.organizationsChanged.next(this.organizations.slice());
  }

  deleteOrganization(index: string) {
    // this.organizations.splice(index, 1);
    this.organizationsChanged.next(this.organizations.slice());
  }
}
