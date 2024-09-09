import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-finalizar',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './finalizar.component.html',
  styleUrl: './finalizar.component.css'
})
export class FinalizarComponent {
  data: any;
  isReturnVisible: boolean = true;
  return: any;
  finalizar: boolean = false;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.data = navigation?.extras.state?.['data'];
    console.log('Dados recebidos:', this.data);
  }

  returnQuestion() {
    this.router.navigate(['/questoes']);
  }

}
