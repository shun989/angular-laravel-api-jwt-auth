import { Injectable } from '@angular/core';
import { User } from './user';
import {Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  url: string = 'http://localhost:8000/api/auth';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  currentUser = {};

  constructor(
    private http: HttpClient,
    private router: Router
  ) {};

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.url}/register`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  };

  // Sign-in
  login(data: any): Observable<any> {
    return this.http.post<any>("http://localhost:8000/api/auth/login", data);
  }

  // alert('dang nhap thanh cong');
  // this.router.navigate(['/admin']);
  signIn(data: any) {
    return this.http.post<any>(`${this.url}/login`, data)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res.id).subscribe((res) => {
          this.currentUser = res;
        })
        alert('dang nhap thanh cong')
        // this.router.navigate(['/auth/user-profile/' + res.msg.id]);
        this.router.navigate(['/admin', res.msg.id]);
      })
  };

  getToken() {
    return localStorage.getItem('access_token');
  };

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  };


  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/']);
    }
  };

  // User profile
  getUserProfile(id: string | number): Observable<any> {
    let authToken = localStorage.getItem('access_token');
    let api = `${this.url}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      // @ts-ignore
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  };

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  };

}
