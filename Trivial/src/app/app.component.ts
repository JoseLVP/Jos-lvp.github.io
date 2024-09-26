import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableroPadreComponent } from "./tablero-padre/tablero-padre.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableroPadreComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Trivial';
}
