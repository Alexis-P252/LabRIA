import { Component, OnInit } from '@angular/core';
import { Materia } from "../interfaces"
import { MateriasService } from "../services/materias.service";

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  

  MateriaNew : Materia = {id:0, nombre: "",  descripcion: "", creditosMinimos: 0 }
  MateriaEdit : Materia = {id:0, nombre: "",  descripcion: "", creditosMinimos: 0 }

  Materias: any;

  // Seleccionada para borrar
  materiaSeleccionada: number = 0;

  constructor(private materiasServ: MateriasService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllMaterias();
  }


  getAllMaterias(){
    this.materiasServ.getMaterias().subscribe( data => {
      this.Materias = data;
      console.log(this.Materias);
    })
  }

  addMateria(){
    this.materiasServ.newMateria(this.MateriaNew).subscribe( 
      data => {
      console.log("Materia agregada correctamente");
      this.ngOnInit();
    }
    , error => {
      console.log(error);
    })
  }

  editMateria(){
    this.materiasServ.updateMateria(this.MateriaEdit).subscribe( 
      data => {
      console.log("Materia editada correctamente");
      this.ngOnInit();
    }
    , error => {
      console.log(error);
    })
  }

  deleteMateria(){
    this.materiasServ.deleteMateria(this.materiaSeleccionada).subscribe( 
      data => {
      console.log("Materia eliminada correctamente");
      this.ngOnInit();
    }
    , error => {
      console.log(error);
    })
  }  



  /* 
  --------------------------------------------------------------
  Collapse NGBootstrap 
  --------------------------------------------------------------
  */
  public isCollapsed = true;


  /* 
  --------------------------------------------------------------
  Modal NGBootstrap 
  --------------------------------------------------------------
  */

  closeResult = '';
      
  // Esta funcion se ejecuta al abrir el modal, en este caso al presionar el boton Eliminar de una materia
  open(content: any, materia:Materia) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
    this.materiaSeleccionada = materia.id;
    console.log(this.materiaSeleccionada);
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
      
  // Esta funcion se ejecuta al abrir el modal, en este caso al presionar el boton Editar de una materia
  open2(content2: any, materia:Materia) {

    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult2 = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult2 = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.MateriaEdit = JSON.parse(JSON.stringify(materia));
    console.log(this.MateriaEdit);
    
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






  
}

