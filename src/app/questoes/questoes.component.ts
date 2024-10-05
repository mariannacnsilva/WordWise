import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgIf } from "@angular/common";
import axios from "axios";

@Component({
  selector: 'app-questoes',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './questoes.component.html',
  styleUrl: './questoes.component.css'
})
export class QuestoesComponent {
  data: any;
  return: any;
  finalizar: boolean = false;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.data = navigation?.extras.state?.['data'];
    console.log('Dados recebidos 1:', this.data);
  }

  sendResponse(event: Event): void {
    event.preventDefault();

    const response = (event.target as HTMLFormElement).querySelector<HTMLTextAreaElement>('textarea[name="response"]')?.value;

    if (!response) {
      this.errorMessage = 'Por favor, responda a pergunta.';
      return;
    }

    this.isLoading = true;

    axios.post('http://127.0.0.1:5000/enviar-resposta', { response })
      .then(resp => {
        this.isLoading = false;
        this.return = resp.data.return;
        this.router.navigate(['/finalizar'], { state: { data: resp.data } });
      })
      .catch(error => {
        this.isLoading = false;
        console.error('Erro ao enviar questionario. ', error);
      });
  }
}
