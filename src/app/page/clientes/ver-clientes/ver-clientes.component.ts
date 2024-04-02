import { Component, OnInit } from '@angular/core';
import { Clientes } from '../../../core/interface/clientes';
import { AgregarClientesComponent } from "../agregar-clientes/agregar-clientes.component";
import Swal from 'sweetalert2';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { Subscriber } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ROUTER_APP } from '../../../core/enum/router-app.enum';
import { PermisosDirective } from '../../../core/directives/permisos/permisos.directive';

@Component({
    selector: 'app-ver-clientes',
    standalone: true,
    templateUrl: './ver-clientes.component.html',
    styleUrl: './ver-clientes.component.css',
    imports: [AgregarClientesComponent, RouterLink, PermisosDirective]
})
export class VerClientesComponent implements OnInit{
  misClientes: Clientes[]=[];
    mostrar: boolean=false;

constructor(private clienteService: ClientesService, private router: Router){


}

  ngOnInit(): void {
/**vamos a ahcer una subcripción de datos  */

this.clienteService.getClientes().subscribe((data: any)=>{
console.log(data);
this.misClientes = data.clientes;
});






//   this.misClientes.push({
//     id:1,
//     nombre:'Luis',
//     direccion: 'calle 13 # 40 57',
//     telefono: 31000000,
//     email:"mail@mail.com",
//     tipoDocumento:"Cedula Ciudadania",
//     numeroDocumento: '11222444',
//     estado:true,
//   },
//   {
//     id:2,
//     nombre:'Carlos',
//     direccion: 'calle 13 # 40 58',
//     telefono: 31000011,
//     email:"mail1@mail.com",
//     tipoDocumento:"Cedula Ciudadania",
//     numeroDocumento: '11222555',
//     estado:true,
//   },
//   {
//     id:3,
//     nombre:'Felipe',
//     direccion: 'calle 13 # 77 57',
//     telefono: 31000001,
//     email:"mail2@mail.com",
//     tipoDocumento:"Cedula Ciudadania",
//     numeroDocumento: '11222777',
//     estado:false,
//   },
//   );

//     this.misClientes.forEach((clientes) =>{
//       console.log('misClientes',clientes);

//     })
// 
}


  eliminarCliente(idCliente: number): void{
    this.misClientes = this.misClientes.filter((cliente) => cliente._id !== idCliente);
    // this.misClientes.slice(idCliente, 1);
    // console.log('Eliminar',this.misClientes)

  }

  recibirData(nuevoCliente:Clientes){
    this.misClientes.push(nuevoCliente);
  }


  showAgregarClientes(){
    this.mostrar=true;

  }

  AgregarCliente(){
 this.router.navigateByUrl(ROUTER_APP.ADD_CLIENTES)
    
    }

  


}

