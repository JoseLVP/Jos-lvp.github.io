import { Component } from '@angular/core';
import { RouterOutlet, RouterLink , RouterLinkActive} from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ContactoComponent } from './contacto/contacto.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ProductoComponent } from './producto/producto.component';
import { PoliticaComponent } from './politica/politica.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PoliticaComponent, RouterOutlet, RouterLink, RouterLinkActive,InicioComponent, ContactoComponent, QuienesSomosComponent, ProductoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularRouting';
}
