import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public atualizarPerfil = new EventEmitter<Usuario>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(dados: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(environment.api_url + 'auth/login', dados)
      .pipe(tap((resp: any) => {
        localStorage.setItem('token', resp.access_token);
      }));
  }

  logout(): void {
    this.http.get(environment.api_url + 'auth/logout').subscribe(resp => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['auth/login']);
    });
  }
  
  getUsuarioAutenticado(): Observable<Usuario> {
    return this.http.get<Usuario>(environment.api_url + 'auth/perfil')
      .pipe(tap(
        (resp: Usuario) => {
          localStorage.setItem('user', btoa(JSON.stringify(resp)));
          this.atualizarPerfil.emit(resp);
        }));
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getUsuarioStorage(): Usuario {
    return localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null;
  }
}
