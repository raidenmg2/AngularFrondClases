import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Clientes } from '../../../core/interface/clientes';


@Component({
  selector: 'app-agregar-clientes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-clientes.component.html',
  styleUrl: './agregar-clientes.component.css'
})

export class AgregarClientesComponent { 
  clienteForm = new FormGroup({
    id: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    tipoDocumento: new FormControl('', [Validators.required]),
    numeroDocumento: new FormControl('', [Validators.required]),
    estado: new FormControl (true,[Validators.required])
  });


  @Output() agregarCliente: EventEmitter<Clientes> = new EventEmitter<Clientes>();
  
  crearCliente(){
    const data = this.clienteForm.value;
     const nuevoCliente: Clientes = {
       id: Number(data.id) || 0,
       nombre: data.nombre || "",
       direccion: String(data.direccion) || '',
       telefono: Number(data.telefono)||0,
       email: String(data.email) || '',
       tipoDocumento: String(data.tipoDocumento),
       numeroDocumento: String(data.numeroDocumento)|| '',
       estado: data.estado || false,
     };
     
     this.agregarCliente.emit(nuevoCliente)
           
     }



     
}









