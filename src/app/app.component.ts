import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {QuestionarioComponent} from "./questionario/questionario.component";
import {HomeComponent} from "./home/home.component";
import {QuestoesComponent} from "./questoes/questoes.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuestionarioComponent, HomeComponent, QuestoesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProjetoFinal';
}
