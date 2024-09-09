import { Component, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from "@angular/router";
import axios from "axios";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-questionario',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './questionario.component.html',
  styleUrl: './questionario.component.css'
})
export class QuestionarioComponent {
  currentQuestionIndex: number = 0;
  totalQuestions: number = 6;

  constructor(private router: Router) { }

  showNextQuestion(): void {
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.currentQuestionIndex++;
    }
  }

  showPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  isQuestionVisible(index: number): boolean {
    return this.currentQuestionIndex === index;
  }

  sendQuestions(event: Event): void {
    event.preventDefault(); // Evita o recarregamento da página

    if (this.currentQuestionIndex === this.totalQuestions - 1 ) {
      const name = (event.target as HTMLFormElement).querySelector<HTMLInputElement>('#name')?.value;
      const age = (event.target as HTMLFormElement).querySelector<HTMLInputElement>('#age')?.value;
      const interests = (event.target as HTMLFormElement).querySelector<HTMLInputElement>('#interests')?.value;
      const ability = (event.target as HTMLFormElement).querySelector<HTMLInputElement>('input[name="ability"]:checked')?.value;
      const currentAbilities = Array.from(
        (event.target as HTMLFormElement).querySelectorAll<HTMLInputElement>('input[name="currentAbility"]:checked')
      ).map(el => el.value);

      const respostas = {
        name: name,
        age: age,
        interests: interests,
        ability: ability,
        currentAbilities: currentAbilities
      }

      axios.post('http://127.0.0.1:5000/enviar-questionario', { respostas })
        .then(response => {
          this.router.navigate(['/questoes'], { state: { data: response.data } });
        })
        .catch(error => {
          console.error('Erro ao enviar questionario. ', error);
        });
    }
  }
}
