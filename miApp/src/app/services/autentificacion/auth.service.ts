
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:9000/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeToken();
  }

  private initializeToken() {
    if (this.isBrowser()) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        this.currentUserSubject.next(parsedUserData);
      }
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (this.isBrowser()) {
          // Guardar toda la información del usuario, no solo el token
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userData', JSON.stringify({
            email: response.email,
            username: response.username,
            role: response.roles[0]
          }));
          this.currentUserSubject.next({
            email: response.email,
            username: response.username,
            role: response.roles[0]
          });
        }
      })
    );
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    }
    this.currentUserSubject.next(null);
  }

  getUserName(): string | null {
    const currentUser = this.currentUserSubject.getValue();
    return currentUser ? currentUser.username : null;
  }

  getUserRole(): string | null {
    const currentUser = this.currentUserSubject.getValue();
    return currentUser ? currentUser.role : null;
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser()) {
      return false;
    }
    return !!localStorage.getItem('authToken');
  }
}