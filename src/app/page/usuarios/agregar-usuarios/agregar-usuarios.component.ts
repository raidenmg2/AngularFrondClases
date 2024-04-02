import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { usuariosInterface } from '../../../core/interface/usuarios';
import { UsuarioModel } from '../../../core/interface/models/usuario.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar-usuarios.component.html',
  styleUrl: './agregar-usuarios.component.css',
})
export class AgregarUsuariosComponent implements OnInit {
  usuarioSelecionado: UsuarioModel;

  usuarioForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    tipoDocumento: new FormControl('', [Validators.required]),
    numeroDocumento: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rol: new FormControl('', [Validators.required]),
    
  });

  constructor(
    private fb: FormBuilder,
    private UsuarioServise: UsuariosService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.buscarUsuario(id);
      
    });
  
  }

  @Output() agregarUsuario: EventEmitter<usuariosInterface> =
    new EventEmitter<usuariosInterface>();

  crearUsuario() {
    const usuarioNuevo = this.usuarioForm.value;
    if (this.usuarioSelecionado) {
      this.actualizarUsuario();
    } else {
      if (this.usuarioForm.valid) {
        const data: usuariosInterface = {
          nombre: usuarioNuevo.nombre || '',
          tipoDocumento: usuarioNuevo.tipoDocumento || '',
          numeroDocumento: usuarioNuevo.numeroDocumento || '',
          email: usuarioNuevo.email || '',
          password: usuarioNuevo.password || '',
          login: usuarioNuevo.login || '',
          rol: usuarioNuevo.rol || '',
        };
        this.usuarioForm.value;
        this.UsuarioServise.crearUsuarios(data).subscribe({
          next: (resp: any) => {
            console.log('Usuario creado', resp);
          },

          error: (error: any) => {
            console.log('error al crear cliente', error);
          },
        });
        console.log('datos', this.usuarioForm.value);
      }
    }

    this.resetForm();
  }
  resetForm() {
    this.usuarioForm.reset();
  }


  
  buscarUsuario(id: string) {
    if (id !== 'nuevo') {
      this.UsuarioServise.getUnUsuario(id).subscribe({
        next: (resp: any) => {
          const {
            nombre,
            tipoDocumento,
            numeroDocumento,
            email,
            login,
            password,
            rol,
            
          } = resp.usuario;
          this.usuarioSelecionado = resp.usuario;

          this.usuarioForm.setValue({
            nombre: nombre,
            tipoDocumento: tipoDocumento,
            numeroDocumento: numeroDocumento,
            email: email,
            password: password,
            login: login,
            rol: rol,
          });
        },

        //errores
        error: (error: any) => {
          const errors = error?.error?.errors;
          const errorList: string[] = [];

          if (errors) {
            Object.entries(errors).forEach(([key, value]: [string, any]) => {
              if (value && value['msg']) {
                errorList.push('* ' + value['msg'] + '<br>');
              }
            });
          }

          Swal.fire({
            title: 'Error al buscar el usuario',
            icon: 'error',
            html: `${errorList.length ? errorList.join('') : error.error.msg}`,
          });
        },
      });
    }
  }

  actualizarUsuario() {
    const dataActualizada: UsuarioModel = {
      _id: this.usuarioSelecionado._id,
      nombre: this.usuarioForm.value.nombre || '',
      email: this.usuarioForm.value.email || '',
      tipoDocumento: this.usuarioForm.value.tipoDocumento || '',
      numeroDocumento: Number(this.usuarioForm.value.numeroDocumento),
      login: this.usuarioForm.value.login || '',
      rol: this.usuarioForm.value.rol || '',
      password: '',
    };
    this.UsuarioServise.actualizarUnUsuario(dataActualizada).subscribe({
      next: (resp: any) => {
        Swal.fire(
          'Usuario Actualizado',
          `El usuario se actualizó satisfactoriamente`,
          'success'
        );
      },
      error: (error: any) => {
        const errors = error?.error?.errors;
        const errorList: string[] = [];

        if (errors) {
          Object.entries(errors).forEach(([key, value]: [string, any]) => {
            if (value && value['msg']) {
              errorList.push('* ' + value['msg'] + '<br>');
            }
          });
        }

        Swal.fire({
          title: 'Error al actualizar el usuario',
          icon: 'error',
          html: `${errorList.length ? errorList.join('') : error.error.msg}`,
        });
      },
    });
  }
}

// export class AgregarUsuariosComponent implements OnInit {
//   usuarioForm: FormGroup;
//   roles = config.roles;

//   get ROUTER_APP() {
//     return ROUTER_APP;
//   }

//   constructor(
//     private formBuilder: FormBuilder,
//     private usuariosService: UsuariosService
//   ) {}

//   ngOnInit(): void {
// this.usuarioForm = this.FormBuilder.group({
//   nombre: ['', Validators.required],
//   email: ['', [Validators.required, Validators.email]],
//   tipoDocumento: ['', Validators.required],
//   numeroDocumento: ['', Validators.required],
//   login: ['', Validators.required],
//   password: ['', Validators.required],
//   rol: ['', Validators.required],
// });

//   }

//   crearUsuario() {
//     if (this.usuarioForm.valid) {
//       const usuarioData = this.usuarioForm.value;
//       this.usuariosService.crearUsuarios(usuarioData).subscribe({
//         next: (resp: any) => {
//           Swal.fire(
//             'Creado',
//             `Se creó el usuario ${resp.usuario.nombre} satisfactoriamente`,
//             'success'
//           );

//           this.usuarioForm.reset();
//         },
//         error: (error) => {
//           Swal.fire('Error', `Error al crear el usuario, ${error}`, 'error');
//         },
//       });
//     } else {
//       Swal.fire(
//         'Error',
//         `El formulario es inválido. Por favor, revise los campos.`,
//         'error'
//       );
//     }
//   }
// }
