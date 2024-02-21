import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ServiciosComponent } from './page/servicios/servicios.component';
import { AcercaDeComponent } from './page/acerca-de/acerca-de.component';
import { ContactoComponent } from './page/contacto/contacto.component';
import { VerClientesComponent } from './page/clientes/ver-clientes/ver-clientes.component';
import { AgregarClientesComponent } from './page/clientes/agregar-clientes/agregar-clientes.component';

export const routes: Routes = [
    {
        path:'',
        title: 'Inicio',
        component: HomeComponent,
    },
    {
        path:'servicio',
        title: 'servicios',
        component: ServiciosComponent,
    },
    {
        path:'acercade',
        title: 'Quienes Somos',
        component: AcercaDeComponent,
    },
    {
        path:'contacto',
        title: 'Contactame',
        component: ContactoComponent,
    },
    {
        path:'clientes',
        title: 'Clientes pótenciales',
        component: VerClientesComponent,
    },
    {
        path:'add-clientes',
        title: 'agregar Clientes',
        component: AgregarClientesComponent,
    },
    
];
