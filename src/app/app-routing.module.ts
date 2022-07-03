import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { VerNoticiaComponent } from './ver-noticia/ver-noticia.component';
import { MateriasComponent } from './materias/materias.component';
import { DocumentosComponent } from './documentos/documentos.component';
import {UnidadesCurricularesComponent} from './unidades-curriculares/unidades-curriculares.component';
import { VerdocumentosComponent } from './verdocumentos/verdocumentos.component';
import { VerUnidadesComponent } from './ver-unidades/ver-unidades.component';


const routes: Routes = [
  {
   path: 'register' , component:  RegisterComponent     
  },
  {
    path: 'login' , component:  LoginComponent
  },
  {
    path: '', component: HomeComponent
  },
  {
    path: 'noticias', component: NoticiasComponent
  },
  {
    path: 'noticia/:id', component: VerNoticiaComponent
  },
  {
    path: 'materias', component: MateriasComponent
  },
  {
    path: 'doc_de_interes', component: DocumentosComponent
  },
  {
    path: 'unidades_curriculares', component: UnidadesCurricularesComponent
  }, 
  {
    path: 'documentos/:categoria', component: VerdocumentosComponent
  },
  {
    path: 'unidad/:id', component: VerUnidadesComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
