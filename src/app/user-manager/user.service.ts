import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  fetchUsers() {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.url}/users`, { headers: { authorization: localStorage.getItem('authToken') }, responseType: 'json' }).subscribe((response) => {
        resolve(response);
      },
        (error) => {
          reject(error);
        });
    });
  }

  addUser(userDetails) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.url}/users`, userDetails, { headers: { authorization: localStorage.getItem('authToken') }, responseType: 'json' }).subscribe((response) => {
        resolve(true);
        this.snackbar.open('User added!', null, {
          duration: 2000
        });
      },
        (error) => {
          reject('Failed to add user');
        });
    });
  }

  updateUser(userDetails) {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment.url}/users/${userDetails.email}`, userDetails, { headers: { authorization: localStorage.getItem('authToken') }, responseType: 'json' }).subscribe((response) => {
        resolve(true);
        this.snackbar.open('User updated!', null, {
          duration: 2000
        });
      },
        (error) => {
          reject('Failed to update user');
        });
    });
  }

  deleteUser(userId) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${environment.url}/users/${userId}`, { headers: { authorization: localStorage.getItem('authToken') }, responseType: 'json' }).subscribe((response) => {
        resolve('User deleted successfully!');
      },
        (error) => {
          reject('Failed to delete user.');
        });
    });
  }


}
