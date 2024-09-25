import { Component, OnInit, Input } from '@angular/core';
import { Organization } from 'src/app/organizations/organization.model';


@Component({
  selector: 'app-organization-item',
  templateUrl: './organization-item.component.html',
  styleUrls: ['./organization-item.component.css']
})
export class OrganizationItemComponent implements OnInit {
  @Input()
  organization!: Organization;
  @Input() index!: string ;

  ngOnInit() {
  }
}
