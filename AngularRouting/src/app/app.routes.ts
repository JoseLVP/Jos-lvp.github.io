import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ProductoComponent } from './producto/producto.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ListaProductosComponent } from './producto/lista-productos/lista-productos.component';
import { BuscarProductoComponent } from './producto/buscar-producto/buscar-producto.component';
import { PoliticaComponent } from './politica/politica.component';

export const routes: Routes = [
    {
        path:"",
        component:InicioComponent
    },
    {
        path:"QuienesSomos",
        component:QuienesSomosComponent
    },
    {
        path:"Producto",
        component:ProductoComponent,

        children: [
            {
                path:"ListaProductos",
                component: ListaProductosComponent
            },{
                path: "BuscarProductos",
                component: BuscarProductoComponent
            }
        ]
    },
    {
        path:"Contacto",
        component:ContactoComponent
    },
    {
        path:"Politica",
        component:PoliticaComponent
    }
];
