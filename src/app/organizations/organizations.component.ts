import { Component, OnInit } from '@angular/core';
import { OrganizationService } from './organization.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.fetchOrganizations().subscribe();
  }

}
