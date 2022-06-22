import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias.service';
import { Noticia_cantidad } from '../interfaces';
import { Noticia } from '../interfaces';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  
  Noticias: any;

  // Linkeada al formulario de crear una nueva noticia
  Noticia!: Noticia;

  // Guardo la id de la noticia seleccionada (cuando se da a eliminar)
  id_seleccionada!: number;

  
  


  constructor( private noticiasServ: NoticiasService, private modalService: NgbModal) { }

  
  

  ngOnInit(): void {
    // Obtengo las primeras seis noticias
    this.getAllNoticias(6,0);
  }


 
  getAllNoticias(limit: number, offset: number){
      
    this.noticiasServ.getAllNoticias(limit, offset).subscribe( data => {
      this.Noticias = data;

    })
  }


  /* 
  --------------------------------------------------------------
  Modal NGBootstrap 
  --------------------------------------------------------------
  */

      closeResult = '';
      
      // Esta funcion se ejecuta al abrir el modal, en este caso al presionar el boton Eliminar de una noticia
      open(content: any, id:number) {
    
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        
        this.id_seleccionada = id;
    
      }
    
      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return `with: ${reason}`;
        }
      }

  /* 
  --------------------------------------------------------------
  Collapse NGBootstrap 
  --------------------------------------------------------------
  */
    public isCollapsed = true;




}


