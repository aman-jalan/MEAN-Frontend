import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/user-manager/user.service';
import { resolve } from 'url';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.css']
})
export class UserFormDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private snackbar: MatSnackBar, public dialogRef: MatDialogRef<UserFormDialogComponent>) { }

  userForm: FormGroup;

  ngOnInit() {
    this.userForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
      hobbies: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.userForm.valid)
      if (this.data.mode === 'Add') {
        this.userService.addUser(this.userForm.value).then(() => {
          return (true);
        }).catch(() => {
          return (false);
        });
      } else {
        this.userService.updateUser(this.userForm.value).then(() => {
          return (true);
        }).catch(() => {
          return (false);
        });
      }
    else
      this.snackbar.open('Please check the form', null, {
        duration: 2000
      });
  }

}
