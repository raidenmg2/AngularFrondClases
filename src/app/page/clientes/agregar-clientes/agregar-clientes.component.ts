import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Clientes } from '../../../core/interface/clientes';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { ClienteModel } from '../../../core/interface/models/cliente.models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-agregar-clientes',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar-clientes.component.html',
  styleUrl: './agregar-clientes.component.css',
})
export class AgregarClientesComponent {
  clienteForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    telefono: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    tipoDocumento: new FormControl('', [Validators.required]),
    numeroDocumento: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
  });

  constructor(private ClienteServise: ClientesService) {}

  @Output() agregarCliente: EventEmitter<Clientes> =
    new EventEmitter<Clientes>();

  crearCliente() {
    const clienteNuevo = this.clienteForm.value;
    if (this.clienteForm.valid) {
      const data: ClienteModel = {
        nombre: clienteNuevo.nombre || '',
        telefono: Number(clienteNuevo.telefono),
        email: clienteNuevo.email || '',
        tipoDocumento: clienteNuevo.tipoDocumento || '',
        numeroDocumento: clienteNuevo.numeroDocumento || '',
        direccion: clienteNuevo.direccion || '',
      };
      this.clienteForm.value;
      this.ClienteServise.crearClientes(data).subscribe({
        next: (resp: any) => {
          console.log('Usuario creado', resp);
        },

        error: (error: any) => {
          console.log('error al crear cliente', error);
        },
      });
      console.log('datos', this.clienteForm.value);
    }

    // se guarda al cliente que se crea

    // const data = this.clienteForm.value;
    //  const nuevoCliente: Clientes = {
    //    _id: Number(data.id) || 0,
    //    nombre: data.nombre || "",
    //    direccion: String(data.direccion) || '',
    //    telefono: Number(data.telefono)||0,
    //    email: String(data.email) || '',
    //    tipoDocumento: String(data.tipoDocumento),
    //    numeroDocumento: String(data.numeroDocumento)|| '',
    //    estado: data.estado || false,
    //  };

    //  this.agregarCliente.emit(nuevoCliente)
    this.resetForm();
  }
  resetForm() {
    this.clienteForm.reset(); 
  }

//   limpiarFormulario() {
//     const form = document.getElementById('clienteForm') as HTMLFormElement;
//     form.reset();
// }


}
