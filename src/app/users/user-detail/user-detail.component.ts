import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from 'src/app/auth/user.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user!: User;
  id!: string;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.user = this.userService.getUser(this.id);
        }
      );
  }

  // onAddToShoppingList() {
  //   this.userService.addIngredientsToShoppingList(this.user.ingredients);
  // }

  onEditUser() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteUser() {
    // this.userService.deleteUser(this.id);
    this.dataStorageService.deleteUser(this.id)
    this.router.navigate(['/users']);
  }

}
