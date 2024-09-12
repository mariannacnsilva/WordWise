import {Component} from '@angular/core';
import {Router} from "@angular/router";
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
  totalQuestions: number = 5;
  name: string | undefined;
  age: string | undefined;
  interests: string | undefined;
  ability: string | undefined;
  currentAbilities: string[] = [];

  constructor(private router: Router) { }

  showNextQuestion(event: Event): void {
    event.preventDefault(); // Evita o comportamento padrão do botão

    const form = (event.target as HTMLElement).closest('form');

    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      if (this.currentQuestionIndex === 0) this.name = form?.querySelector<HTMLInputElement>('#name')?.value || '';
      if (this.currentQuestionIndex === 1) this.age = form?.querySelector<HTMLInputElement>('#age')?.value || '';
      if (this.currentQuestionIndex === 2) this.interests = form?.querySelector<HTMLTextAreaElement>('#interests')?.value || '';
      if (this.currentQuestionIndex === 3) this.ability = form?.querySelector<HTMLInputElement>('input[name="ability"]:checked')?.value || '';
      if (this.currentQuestionIndex === 4) this.currentAbilities = Array.from(
        form?.querySelectorAll<HTMLInputElement>('input[name="currentAbility"]:checked') || []
      ).map(el => el.value);

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

      const respostas = {
        name: this.name,
        age: this.age,
        interests: this.interests,
        ability: this.ability,
        currentAbilities: this.currentAbilities
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
