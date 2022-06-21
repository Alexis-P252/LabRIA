import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  NoticiasActivas: any;
  Noticias: any;

  constructor( private noticiasServ: NoticiasService) { 
    
  }

  ngOnInit(): void {
    this.getAllNoticias(5,3);
  }


  getNoticiasActivas(){

    this.noticiasServ.getNoticiasActivas().subscribe( data => {
      this.NoticiasActivas = data;
      console.log("AAAAA");
      console.warn(this.NoticiasActivas);
    })
  }

  getAllNoticias(limit: number, offset: number){
      
      this.noticiasServ.getAllNoticias(limit, offset).subscribe( data => {
        this.Noticias = data;
        console.log("AAAAA");
        console.warn(this.Noticias);
      })
    }
}
