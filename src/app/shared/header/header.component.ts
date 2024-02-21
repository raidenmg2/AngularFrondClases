import { Component } from '@angular/core';
import { ContadorComponent } from '../../components/contador/contador.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  contador: number =0;

  recibirContador(numero: number){
    this.contador = numero;
  
  }

}

