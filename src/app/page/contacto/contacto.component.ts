import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
/**se utiliza para crear un formulario reactivo */
export class ContactoComponent {
  contactoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    edad: new FormControl('',Validators.required),
    telefono: new FormControl('',Validators.required),
    mensaje: new FormControl('',Validators.required),
  })

  enviarContacto(){
      console.log('Envia formulario',this.contactoForm.value);
    }

}
