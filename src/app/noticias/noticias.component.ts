import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias.service';
import { Noticia_cantidad } from '../interfaces';
import { Noticia } from '../interfaces';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  limit = 6;

  Noticias: any;

  // Linkeada al formulario de crear una nueva noticia
  NoticiaNew: Noticia = {id: 0,titulo:"",descripcion:"",imagen:"",fechaCaducidad:""};
  // Linkeada al formulario de editar una noticia
  NoticiaEdit : Noticia = {id: 0,titulo:"",descripcion:"",imagen:"",fechaCaducidad:""};

  // Guardo la id de la noticia seleccionada (cuando se da a eliminar)
  id_seleccionada!: number;

  constructor( private noticiasServ: NoticiasService, private modalService: NgbModal) { }

  
  ngOnInit(): void {
    // Obtengo las primeras noticias
    this.getAllNoticias(this.limit,0);
    
  }


 
  getAllNoticias(limit: number, offset: number){
      
    this.noticiasServ.getAllNoticias(limit, offset).subscribe( data => {
      this.Noticias = data;

    })
  }


  addNoticia(){
    
  }


  /* 
  --------------------------------------------------------------
  Modal NGBootstrap 
  --------------------------------------------------------------
  */

      closeResult = '';
      
      // Esta funcion se ejecuta al abrir el modal, en este caso al presionar el boton Eliminar de una noticia
      open(content: any, noticia:Noticia) {
    
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        
        this.id_seleccionada = noticia.id;
    
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
  Modal NGBootstrap2 
  --------------------------------------------------------------
  */

  closeResult2 = '';
      
  // Esta funcion se ejecuta al abrir el modal, en este caso al presionar el boton Editar de una noticia
  open2(content2: any, noticia:Noticia) {

    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult2 = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult2 = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.NoticiaEdit = noticia;
   
    


  }

  private getDismissReason2(reason: any): string {
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


