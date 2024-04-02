import { Component, OnDestroy, OnInit } from '@angular/core';
import { usuariosInterface } from '../../../core/interface/usuarios';
import { Subscriber, Subscription } from 'rxjs';
import { UsuarioModel } from '../../../core/interface/models/usuario.models';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import Swal from 'sweetalert2';
import { AutenticacionService } from '../../../services/autenticacion/autenticacion.service';
import { AgregarUsuariosComponent } from '../agregar-usuarios/agregar-usuarios.component';
import { PermisosDirective } from '../../../core/directives/permisos/permisos.directive';
import { Router, RouterLink } from '@angular/router';
import { ROUTER_APP } from '../../../core/enum/router-app.enum';
import { config } from '../../../../environments/configuration/config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ver-usuarios',
  standalone: true,
  imports: [AgregarUsuariosComponent, PermisosDirective, RouterLink,FormsModule],
  templateUrl: './ver-usuarios.component.html',
  styleUrl: './ver-usuarios.component.css',
})
export class VerUsuariosComponent implements OnInit, OnDestroy {
  usuarios: UsuarioModel[] = [];
  usuarioSubscription: Subscription;
  usuarioLogin: UsuarioModel;
  roles = config.roles;

  // roles= Object.values(config.roles);

  constructor(
    private usuarioService: UsuariosService,
    private autenticacionService: AutenticacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioLogin = this.autenticacionService.usuario;
    this.cargarUsuarios();
  }

  ngOnDestroy(): void {
    this, this.usuarioSubscription?.unsubscribe();
  }

  AgregarUsuario() {
    this.router.navigateByUrl(`${ROUTER_APP.AGREGAR_USUARIOS}/nuevo`);
  }

  editarUsuarios(id:string){

    this.router.navigateByUrl(`${ROUTER_APP.AGREGAR_USUARIOS}/${id}`);
  }
  actualizarUsuarios(id:string){

    this.router.navigateByUrl(`${ROUTER_APP.AGREGAR_USUARIOS}/${id}`);
  }

  cargarUsuarios() {
    this.usuarioSubscription = this.usuarioService
      .getUsuarios()
      .subscribe((resp: any) => {
        this.usuarios = resp.usuario;
        console.log('usuarios',resp.usuario)
      });
  }

  eliminarUsuario(id: string) {
    if (id === this.usuarioLogin._id) {
      Swal.fire('error', 'No se puede elimir este usuario', 'error');
    } else {
      this.usuarioService.eliminarUnUsuario(id).subscribe((resp: any) => {
        Swal.fire(
          'eliminado',
          `se elimino el usuario ${resp.usuario.nombre}`,
          'success'
        );
      });
    }
  }

  actualizarRol(usuario: UsuarioModel) {
    this.usuarioService.actualizarUnUsuario(usuario).subscribe((resp: any) => {
      Swal.fire(
        'Actializado',
        `se actualizo el usuario ${resp.usuario.nombre}`,
        'success'
      );
    });
  }
}
