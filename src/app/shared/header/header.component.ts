import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTER_APP } from '../../core/enum/router-app.enum';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  // inyectar sin constructor
  autenticacionService = inject(AutenticacionService);
  
  
  get ROUTER_APP() {
    return ROUTER_APP;
  }
  
  
  cerrarSesion() {
  this.autenticacionService.logOut();
  }

}
