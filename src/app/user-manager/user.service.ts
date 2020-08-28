import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  fetchUsers() {
    return new Promise((resolve, reject) => {
      this.http.get('/users', { headers: { authorization: 'token' } }).subscribe((response) => {
        resolve(response);
      },
        (error) => {
          reject(error);
        });
    });
  }

  addUser(userDetails) {
    return new Promise((resolve, reject) => {
      this.http.post('/users', userDetails, { headers: { authorization: 'token' } }).subscribe((response) => {
        resolve('User added successfully!');
      },
        (error) => {
          reject('Failed to add user');
        });
    });
  }

  updateUser(userDetails) {
    return new Promise((resolve, reject) => {
      this.http.put('/user', userDetails, { headers: { authorization: 'token' } }).subscribe((response) => {
        resolve('User updated successfully!');
      },
        (error) => {
          reject('Failed to update user');
        });
    });
  }

  deleteUser(userId) {
    return new Promise((resolve, reject) => {
      this.http.delete(`/user/:${userId}`, { headers: { authorization: 'token' } }).subscribe((response) => {
        resolve('User deleted successfully!');
      },
        (error) => {
          reject('Failed to delete user.');
        });
    });
  }


}
