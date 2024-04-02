import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInterface } from '../../core/interface/login-interface';
import { environment } from '../../../environments/environment';
import { Observable, catchError, map, of, pipe, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../core/interface/models/usuario.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {

usuario: UsuarioModel;

  constructor(private httpClient: HttpClient, private router: Router) {}

  

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  validateToken(): Observable<boolean> {
    return this.httpClient.get(`${base_url}/auth`, {
      headers: {
        'x-token': this.token,
      },
    }).pipe(

      map((resp: any) =>{
        const {
          _id,
          nombre,
          email,
          tipoDocumento,
          numeroDocumento,
          login,
          rol,
          estado,
          createdAt,
          password,
        } = resp.usuario;

        this.usuario = new UsuarioModel(
          _id,
          nombre,
          email,
          tipoDocumento,
          numeroDocumento,
          login,
          rol,
          estado,
          createdAt,
          password,
        );
        localStorage.setItem('token', resp.token)
          return true;
      }),
      catchError((error)=>{
        console.error(error);
        return of(false);
      })
    );
  }

  login(login: LoginInterface) {
    return (
      this.httpClient.post(`${base_url}/auth`, login).
      pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      )
    );
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }
}
