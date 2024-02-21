import { Component } from '@angular/core';
import { TablaComponent } from '../../components/tabla/tabla.component';
import { ContadorComponent } from '../../components/contador/contador.component';

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [TablaComponent,ContadorComponent],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css'
})


export class PersonaComponent{
  titulo: string = "componente persona";
  edad: number = 22;
  ocultar: boolean = true ;
  users:{id:number | string, name: string}[]=[
  { id: 0 , name: 'sarah'},
  { id: 1 , name: 'Amy'},
  { id: 2 , name: 'Rachel'},
  { id: 3 , name: 'Jesica'},
  { id: 4 , name: 'Poornima'},
  { id: 5 , name: 'Ana Lucia'},
  { id: 6 , name: 'Maria'},
  { id: 7 , name: 'Antonio'},


]
  contador: number =0;

recibirContador(numero: number){
  this.contador = numero;

}

}
