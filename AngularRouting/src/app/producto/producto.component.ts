import { Component } from '@angular/core';
import { RouterOutlet, RouterLink , RouterLinkActive} from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [ListaProductosComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

}
