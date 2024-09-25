import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.fetchUsers().subscribe();
  }

}
