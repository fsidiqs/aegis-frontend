import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id!: number;
  editMode = false;
  userForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    // const newUser = new User(
    //   this.userForm.value['name'],
    //   this.userForm.value['description'],
    //   this.userForm.value['imagePath'],
    //   this.userForm.value['ingredients']);
    if (this.editMode) {
      this.userService.updateUser(this.id, this.userForm.value);
    } else {
      this.userService.addUser(this.userForm.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (this.userForm.get('ingredients') as FormArray).push(
          new FormGroup({
            name: new FormControl<string | null>(null, Validators.required),
            amount: new FormControl<number | null>(null, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          })
        );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.userForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let userName = '';
    let userEmail = '';
    let userRole = '';
    let userIngredients = new FormArray<FormGroup<{ name: FormControl<string | null>; amount: FormControl<number | null> }>>([]);

    if (this.editMode) {
      const user = this.userService.getUser(this.id);
      userName = user.name;
      userEmail = user.email;
      userRole = user.role;
      // if (user['ingredients']) {
      //   for (let ingredient of user.ingredients) {
      //     userIngredients.push(
      //                 new FormGroup({
      //                   name: new FormControl<string>(ingredient.name, Validators.required),
      //                   amount: new FormControl<number>(ingredient.amount, [
      //                     Validators.required,
      //                     Validators.pattern(/^[1-9]+[0-9]*$/)
      //                   ])
      //                 })
      //               );
      //   }
      // }
    }

    this.userForm = new FormGroup({
      name: new FormControl(userName, Validators.required),
      email: new FormControl(userEmail, Validators.required),
      role: new FormControl(userRole, Validators.required),
      // ingredients: userIngredients
    });
  }

  get ingredientControls() {
    return (this.userForm.get('ingredients') as FormArray).controls;
  }
}
