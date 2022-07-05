import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias.service';
import { Noticia } from '../interfaces';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

  public Activas: Noticia[] = [];

  isLoading = true;

  constructor(private noticiasServ: NoticiasService) { }


  ngOnInit(): void {

    // Obtengo las noticias activas de la API y las guardo en una variable lcoal
    this.noticiasServ.getNoticiasActivas().subscribe(
      data => {
        this.Activas = data;
      }, error => {
        console.log(error);
      }, () => {
        this.isLoading = false;
      }
    );
  }

}

