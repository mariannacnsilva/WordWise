import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionarioComponent } from './questionario/questionario.component';
import { QuestoesComponent } from './questoes/questoes.component';
import {FinalizarComponent} from "./finalizar/finalizar.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'questionario', component: QuestionarioComponent },
  { path: 'questoes', component: QuestoesComponent },
  { path: 'finalizar', component: FinalizarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
