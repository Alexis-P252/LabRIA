import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { NoticiasService } from '../services/noticias.service';
import { Noticia } from '../interfaces';

@Component({
  selector: 'app-ver-noticia',
  templateUrl: './ver-noticia.component.html',
  styleUrls: ['./ver-noticia.component.css']
})
export class VerNoticiaComponent implements OnInit {
  
  isLoading: boolean = true;
  public id: number = 0;
  public Noticia: any;
  private routeSub: Subscription = new Subscription;

  constructor(private route: ActivatedRoute, private NoticiaServ: NoticiasService) { }
  

  ngOnInit(): void {

    // Obtengo de la URL el id de la noticia seleccionada
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    // Ahora obtengo la noticia de la API
    this.NoticiaServ.getNoticia(this.id).subscribe(data => {
      this.Noticia = data;},
      error => {},
      () => {
        this.isLoading = false;
      } 
      );
  }

}
