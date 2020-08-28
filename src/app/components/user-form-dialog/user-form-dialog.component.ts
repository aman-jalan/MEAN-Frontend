import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/user-manager/user.service';
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
    console.log("user: ", this.data);
    this.userForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
      hobbies: new FormControl(null, Validators.required),
    });

    if (this.data.mode === "Edit") {
      this.userForm.setValue({
        email: this.data.user.email,
        password: this.data.user.password,
        firstName: this.data.user.firstName,
        lastName: this.data.user.lastName,
        age: this.data.user.age,
        hobbies: this.data.user.hobbies
      });
      this.userForm.controls['email'].disable();
    }
  }

  submit() {
    if (this.userForm.valid)
      if (this.data.mode === 'Add') {
        this.userService.addUser(this.userForm.value).then(() => {
          this.dialogRef.close(true);
        }).catch(() => {
          return (false);
        });
      } else {
        this.userService.updateUser(this.userForm.value).then(() => {
          this.dialogRef.close(true);
        }).catch(() => {
          this.dialogRef.close(false);
        });
      }
    else
      this.snackbar.open('Please check the form', null, {
        duration: 2000
      });
  }

}
