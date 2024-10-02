import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgIf } from "@angular/common";
import axios from "axios";

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
  totalQuestions: number = 5;
  name: string | undefined;
  age: string | undefined;
  interests: string | undefined;
  ability: string | undefined;
  currentAbilities: string[] = [];
  errorMessage: string | null = null;

  constructor(private router: Router) { }

  showNextQuestion(event: Event): void {
    event.preventDefault();
    this.errorMessage = null;

    const form = (event.target as HTMLElement).closest('form');

    // Validações para cada pergunta
    if (this.currentQuestionIndex === 0) {
      this.name = form?.querySelector<HTMLInputElement>('#name')?.value || '';
      if (!this.name) {
        this.errorMessage = 'Por favor, insira seu nome.';
        return;
      }
    }

    if (this.currentQuestionIndex === 1) {
      this.age = form?.querySelector<HTMLInputElement>('#age')?.value || '';
      if (!this.age || isNaN(Number(this.age))) {
        this.errorMessage = 'Por favor, insira uma idade válida.';
        return;
      }
    }

    if (this.currentQuestionIndex === 2) {
      this.interests = form?.querySelector<HTMLTextAreaElement>('#interests')?.value || '';
      if (!this.interests) {
        this.errorMessage = 'Por favor, insira seus interesses.';
        return;
      }
    }

    if (this.currentQuestionIndex === 3) {
      this.ability = form?.querySelector<HTMLInputElement>('input[name="ability"]:checked')?.value || '';
      if (!this.ability) {
        this.errorMessage = 'Por favor, selecione uma habilidade.';
        return;
      }
    }

    if (this.currentQuestionIndex === 4) {
      this.currentAbilities = Array.from(
        form?.querySelectorAll<HTMLInputElement>('input[name="currentAbility"]:checked') || []
      ).map(el => el.value);
      if (this.currentAbilities.length === 0) {
        this.errorMessage = 'Por favor, selecione ao menos uma habilidade que você já possui.';
        return;
      }
    }

    if (this.currentQuestionIndex < this.totalQuestions) {
      this.currentQuestionIndex++;
    }
  }

  showPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.errorMessage = null;
      this.currentQuestionIndex--;
    }
  }

  isQuestionVisible(index: number): boolean {
    return this.currentQuestionIndex === index;
  }

  sendQuestions(event: Event): void {
    event.preventDefault();

    if (this.currentQuestionIndex === this.totalQuestions - 1 ) {

      const respostas = {
        name: this.name,
        age: this.age,
        interests: this.interests,
        ability: this.ability,
        currentAbilities: this.currentAbilities
      }

      axios.post('http://127.0.0.1:5000/enviar-questionario', { respostas })
        .then(response => {
          console.log("Resposta de nviar-questionario", response);
          this.router.navigate(['/questoes'], { state: { data: response.data } });
        })
        .catch(error => {
          console.error('Erro ao enviar questionário. ', error);
        });
    }
  }
}
