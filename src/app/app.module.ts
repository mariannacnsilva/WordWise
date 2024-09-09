import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { QuestionarioComponent } from './questionario/questionario.component';
import {FinalizarComponent} from "./finalizar/finalizar.component";

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'questoes', component: QuestionarioComponent },
      { path: 'finalizar', component: FinalizarComponent }
    ])
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
