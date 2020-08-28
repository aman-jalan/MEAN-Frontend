import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private snackbar: MatSnackBar, public route: Router) { }

  login(user) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.url}/login`, { email: user.email, password: user.password }, { responseType: 'json' }).subscribe((response: any) => {
        localStorage.setItem("authToken", response.token);
        resolve(true);
      }, (error) => {
        this.snackbar.open(error.message, null, {
          duration: 3000
        })
        reject(error);
      })
    })
  }

  logout() {
    localStorage.removeItem("authToken");
    this.route.navigate(["login"]);
  }
}
