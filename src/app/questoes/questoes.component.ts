import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {NgIf} from "@angular/common";
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
  isVisible: boolean = true;
  isReturnVisible: boolean = false;
  return: any;
  finalizar: boolean = false;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.data = navigation?.extras.state?.['data'];
    console.log('Dados recebidos:', this.data);
  }

  textVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  sendResponse(event: Event): void {
    event.preventDefault();

    const response = (event.target as HTMLFormElement).querySelector<HTMLInputElement>('input[name="response"]:checked')?.value;

    axios.post('http://127.0.0.1:5000/enviar-resposta', { response })
      .then(resp => {
        console.log(resp);
        this.return = resp.data.respostas.return
        this.router.navigate(['/finalizar'], { state: { data: resp.data.respostas.return } });
      })
      .catch(error => {
        console.error('Erro ao enviar questionario. ', error);
      });
  }

}
