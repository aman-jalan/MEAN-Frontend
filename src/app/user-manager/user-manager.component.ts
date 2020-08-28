import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './user.service';
import { UserFormDialogComponent } from '../components/user-form-dialog/user-form-dialog.component';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

export interface UsersElement {
  _id: string,
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number,
  hobbies: [string];
}

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})

export class UserManagerComponent implements OnInit {
  users = new MatTableDataSource<UsersElement>([{
    _id: '123',
    email: 'aman.jln@gmail.com',
    password: 'amanjalan',
    firstName: 'aman',
    lastName: 'jalan',
    age: 25,
    hobbies: ['dancing'],
  }, {
    _id: '234',
    email: 'eyad.kte@gmail.com',
    password: 'eyadkobatte',
    firstName: 'eyad',
    lastName: 'kobatte',
    age: 24,
    hobbies: ['brewing coffee'],
  }]);
  displayedColumns: string[] = ['position', 'name', 'email', 'age', 'hobbies', 'options'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private snackbar: MatSnackBar, private dialog: MatDialog, private userService: UserService, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.userService.fetchUsers().then((result: [UsersElement]) => {
      this.users.data = result
    });
    this.users.sort = this.sort;
    this.users.paginator = this.paginator;
  }

  fetchHobbies(hobbies) {
    let result = '';
    hobbies.forEach(hobby => {
      result += ` ${hobby}`;
    });
    return result;
  }

  deleteUser(userId) {
    this.userService.deleteUser(userId).then(() => {
      this.ngOnInit();
    });
  }

  openUserDialog(mode, user) {
    this.dialog.open(UserFormDialogComponent, {
      data: { user, mode },
      width: '400px'
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  logout() {
    this.loginService.logout();
  }
}
