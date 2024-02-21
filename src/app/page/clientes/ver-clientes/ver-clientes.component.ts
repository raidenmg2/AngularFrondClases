import { Component, OnInit } from '@angular/core';
import { Clientes } from '../../../core/interface/clientes';
import { AgregarClientesComponent } from "../agregar-clientes/agregar-clientes.component";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-ver-clientes',
    standalone: true,
    templateUrl: './ver-clientes.component.html',
    styleUrl: './ver-clientes.component.css',
    imports: [AgregarClientesComponent]
})
export class VerClientesComponent implements OnInit{
  misClientes: Clientes[]=[];
  
  mostrar: boolean=false;
  ngOnInit(): void {
  this.misClientes.push({
    id:1,
    nombre:'Luis',
    direccion: 'calle 13 # 40 57',
    telefono: 31000000,
    email:"mail@mail.com",
    tipoDocumento:"Cedula Ciudadania",
    numeroDocumento: '11222444',
    estado:true,
  },
  {
    id:2,
    nombre:'Carlos',
    direccion: 'calle 13 # 40 58',
    telefono: 31000011,
    email:"mail1@mail.com",
    tipoDocumento:"Cedula Ciudadania",
    numeroDocumento: '11222555',
    estado:true,
  },
  {
    id:3,
    nombre:'Felipe',
    direccion: 'calle 13 # 77 57',
    telefono: 31000001,
    email:"mail2@mail.com",
    tipoDocumento:"Cedula Ciudadania",
    numeroDocumento: '11222777',
    estado:false,
  },
  );

    this.misClientes.forEach((clientes) =>{
      console.log('misClientes',clientes);

    })
}


  eliminarCliente(idCliente: number): void{
    this.misClientes = this.misClientes.filter((cliente) => cliente.id !== idCliente);
    // this.misClientes.slice(idCliente, 1);
    // console.log('Eliminar',this.misClientes)

  }

  recibirData(nuevoCliente:Clientes){
    this.misClientes.push(nuevoCliente);
  }


  showAgregarClientes(){
    this.mostrar=true;

  }


  
  limpiarFormulario() {
    const form = document.getElementById('miFormulario') as HTMLFormElement;
    form.reset();
}
}

