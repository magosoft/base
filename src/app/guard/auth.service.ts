import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private tokenKey = 'auth-token';
  constructor(private _http: HttpClient) {

  }

  public login(credentials: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => this.setToken(response.token))
    );
  }

  public logout(): Observable<any> {
    return this._http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => this.removeToken())
    );
  }

  private setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  private removeToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }
}
