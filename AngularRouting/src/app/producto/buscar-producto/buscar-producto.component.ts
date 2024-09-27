import { Component } from '@angular/core';
import { ArrayProducto } from '../lista-productos/ArrayProductos';
import { PlantillaProductor } from '../lista-productos/interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscar-producto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css'] // Cambia 'styleUrl' a 'styleUrls'
})
export class BuscarProductoComponent {
  public ArrayProductos: PlantillaProductor[] = ArrayProducto;
  public texto: string = '';
  public inputProducto: string = ''; // Cambiado a tipo string

  buscarProducto(id: string) {
    const producto = this.ArrayProductos.find(p => p.ID === id);

    if (producto) {
      this.texto = `Se ha encontrado el producto: ${producto.Nombre}, Precio: ${producto.Precio}`;
    } else {
      this.texto = "No se ha encontrado el producto, busque en otra tienda";
    }
  }
}
