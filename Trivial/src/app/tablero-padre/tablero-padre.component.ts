import { Component } from '@angular/core';
import { CubileteHijoComponent } from './cubilete-hijo/cubilete-hijo.component';
import { Cagoen } from '../entidades/preguntas';

@Component({
  selector: 'app-tablero-padre',
  standalone: true,
  imports: [CubileteHijoComponent],
  templateUrl: './tablero-padre.component.html',
  styleUrl: './tablero-padre.component.css'
})
export class TableroPadreComponent{

  public numeroAleatorio : number = Math.floor(Math.random() * (83 - 1) + 1);
  public MostrarRespuesta2 : string = "";
  public MostrarQueso2: string =""
  public incrementar : number = 0;
  
  public TextoPreguntaPadre : string = "";
  public respuesta1Padre : string = "";
  public respuesta2Padre : string = "";
  public respuesta3Padre : string = "";
  public respuesta4Padre : string = "";
  public RespuestaCorrectaPadre : number = 0;
  
  
  constructor(){
    this.MostrarQueso2 = `${this.incrementar}.jpeg`;
    this.imprimirPregunta();
  }

  imprimirPregunta() {
    
    const preguntaSeleccionada = Cagoen[this.numeroAleatorio];
    this.TextoPreguntaPadre = preguntaSeleccionada.textoPregunta;
    this.respuesta1Padre = preguntaSeleccionada.opcion1;
    this.respuesta2Padre = preguntaSeleccionada.opcion2;
    this.respuesta3Padre = preguntaSeleccionada.opcion3;
    this.respuesta4Padre = preguntaSeleccionada.opcion4;

    this.RespuestaCorrectaPadre = preguntaSeleccionada.correcta;
    
    
}

  comprobarRespuesta(respuesta : number){
    
    if (this.incrementar >= 8) {
      alert("Has ganado el jogo")
      this.incrementar = 0;
      location.reload();
      
    }
    
    if(this.RespuestaCorrectaPadre == respuesta){
      this.incrementar++
      this.MostrarQueso2 = `${this.incrementar}.jpeg`;
      this.numeroAleatorio = Math.floor(Math.random() * (83 - 1) + 1);
      this.imprimirPregunta();
      

    } else {
      alert("Te has equivocado machote :(")
      alert("💀💀💀")
      location.reload();
      
    }

  }
  
}
