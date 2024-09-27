import { Component } from '@angular/core';
import { ArrayProducto } from './ArrayProductos';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {

  public ArrayObjetos =  ArrayProducto;

}
