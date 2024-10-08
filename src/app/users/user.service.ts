import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User, UserCreate } from '../auth/user.model';

@Injectable()
export class UserService {
  usersChanged = new Subject<User[]>();

  // private users: User[] = [
  //   new User(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new User(
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //   )
  // ];
  private users: User[] = [];

  constructor() {

  }

  setUsers(users: User[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  getUsers() {
    return this.users.slice();
  }

  getUser(index: string) {
    return this.users.find((user) => user.id === index);
  }

  // addIngredientsToShoppingList(ingredients: Ingredient[]) {
  //   this.slService.addIngredients(ingredients);
  // }

  addUser(user: UserCreate) {
    // this.users.push(user);
    // this.dataStorageService.postUser(user.email, user.name, user.role, user.password).subscribe();
    this.usersChanged.next(this.users.slice());
  }

  updateUser(index: number, newUser: User) {
    this.users[index] = newUser;
    this.usersChanged.next(this.users.slice());
  }

  deleteUser(index: string) {
    // this.users.splice(index, 1);
    this.usersChanged.next(this.users.slice());
  }
}
