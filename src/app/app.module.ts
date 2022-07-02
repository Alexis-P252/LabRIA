import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { VerNoticiaComponent } from './ver-noticia/ver-noticia.component';
import { MateriasComponent } from './materias/materias.component';
import { AuthInterceptorService } from './services/auth-interceptor-service.service';
import { DocumentosComponent } from './documentos/documentos.component';
import { UnidadesCurricularesComponent } from './unidades-curriculares/unidades-curriculares.component';
import { VerdocumentosComponent } from './verdocumentos/verdocumentos.component';





@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CarrouselComponent,
    NavbarComponent,
    HomeComponent,
    NoticiasComponent,
    VerNoticiaComponent,
    MateriasComponent,
    DocumentosComponent,
    UnidadesCurricularesComponent,
    VerdocumentosComponent,
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
     },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
