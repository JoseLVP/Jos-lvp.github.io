import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cubilete-hijo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cubilete-hijo.component.html',
  styleUrl: './cubilete-hijo.component.css'
})


@Output("Respuesta")

export class CubileteHijoComponent {

  @Input() public TextoPregunta : string = "";
  @Input() public respuesta1 : string = "";
  @Input() public respuesta2 : string = "";
  @Input() public respuesta3 : string = "";
  @Input() public respuesta4 : string = "";
  @Input() public RespuestaCorrecta : number = 0;
  @Input() public RespuestaVacia : string = ";";
  
  public Solucion : number = 0;

  @Input() public ContadorAciertos : number = 0;
  @Input() public MostrarQueso : string = "";
  
  @Output() public RespuestaObtenida : EventEmitter<number> = new EventEmitter<number>();
  
  constructor() {
    
  }

  seleccionarRespuesta(respuesta: number) {
    this.Solucion = respuesta;
    this.RespuestaObtenida.emit(this.Solucion);
  }
}
