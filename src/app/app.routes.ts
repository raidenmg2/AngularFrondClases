import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ServiciosComponent } from './page/servicios/servicios.component';
import { AcercaDeComponent } from './page/acerca-de/acerca-de.component';
import { ContactoComponent } from './page/contacto/contacto.component';
import { VerClientesComponent } from './page/clientes/ver-clientes/ver-clientes.component';
import { AgregarClientesComponent } from './page/clientes/agregar-clientes/agregar-clientes.component';
import { AutenticacionComponent } from './auth/autenticacion/autenticacion.component';
import { authGuard } from './guards/auth/auth.guard';
import { AgregarUsuariosComponent } from './page/usuarios/agregar-usuarios/agregar-usuarios.component';
import { VerUsuariosComponent } from './page/usuarios/ver-usuarios/ver-usuarios.component';


export const routes: Routes = [

    {
        path:'auth',
        title: 'inicio de sesion',
        children:[
            { path: 'login', component: AutenticacionComponent}]
    },
    {
        path:'inicio',
        title: 'Inicio',
        canActivate: [authGuard],
        children:[
            {path:'', title:'Inicio',  component: HomeComponent},// path por defecto del paht padre

            {
             path:'servicios',
             title:'servicios',
               component: ServiciosComponent},

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
            {
                path:'usuarios',
                title: 'usuarios registrados',
                component: VerUsuariosComponent,
            },
            {
                path:'agregar-usuarios/:id',
                title: 'agregar usuario',
                component: AgregarUsuariosComponent,
            },



        ]
    },  
   
    {path: '**', redirectTo:'auth/login', pathMatch: 'full'},// si no encuentra la ruta direcciona al login
];
