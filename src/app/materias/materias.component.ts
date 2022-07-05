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

  isLoading: boolean = true;

  alertSuccess: string = "";
  alertError: string = "";

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
    },
    error => {
      this.alertError = "Hubo un error al obtener las materias";
      document.getElementById("alertaError")!.style.display = "block";

      setTimeout(() => {
        document.getElementById("alertaError")!.style.display = "none";
      } , 3000);
    },
    () => {
      this.isLoading = false;
    });
  }

  addMateria(){

    if(this.MateriaNew.nombre == "" || this.MateriaNew.descripcion == "" || this.MateriaNew.creditosMinimos == 0){
      this.alertError = "Todos los campos son obligatorios, los creditos minimos deben ser mayor a 0";
      document.getElementById("alertaError")!.style.display = "block";

      setTimeout(() => {
        document.getElementById("alertaError")!.style.display = "none";
      }, 3000);
    }
    else{

      this.materiasServ.newMateria(this.MateriaNew).subscribe( 
        data => {
        this.ngOnInit();
        this.alertSuccess = "Materia agregada correctamente";
        document.getElementById("alertaSuccess")!.style.display = "block";

        setTimeout(() => {
          document.getElementById("alertaSuccess")!.style.display = "none";
        }, 3000);
      }
      , error => {
          this.alertError = "Hubo un error al agregar la materia";
          document.getElementById("alertaError")!.style.display = "block";
  
          setTimeout(() => {
            document.getElementById("alertaError")!.style.display = "none";
          }, 3000);
        
      })

    }


   
  }

  editMateria(){

    if(this.MateriaEdit.nombre == "" || this.MateriaEdit.descripcion == "" || this.MateriaEdit.creditosMinimos == 0){
      this.alertError = "Todos los campos son obligatorios, los creditos minimos deben ser mayor a 0";
      document.getElementById("alertaError")!.style.display = "block";

      setTimeout(() => {
        document.getElementById("alertaError")!.style.display = "none";
      }, 3000);
    }
    else{

      this.materiasServ.updateMateria(this.MateriaEdit).subscribe( 
        data => {
        this.ngOnInit();
        this.alertSuccess = "Materia editada correctamente";
        document.getElementById("alertaSuccess")!.style.display = "block";

        setTimeout(() => {
          document.getElementById("alertaSuccess")!.style.display = "none";
        }, 3000);

      }
      , error => {

        this.alertError = "Hubo un error al editar la materia";
        document.getElementById("alertaError")!.style.display = "block";

        setTimeout(() => {
          document.getElementById("alertaError")!.style.display = "none";
        }, 3000);
  
      })

    }

    
  }

  deleteMateria(){
    this.materiasServ.deleteMateria(this.materiaSeleccionada).subscribe( 
      data => {
      this.ngOnInit();
      this.alertSuccess = "Materia eliminada correctamente";
        document.getElementById("alertaSuccess")!.style.display = "block";

        setTimeout(() => {
          document.getElementById("alertaSuccess")!.style.display = "none";
        }, 3000);

    }
    , error => {
      this.alertError = "Hubo un error al eliminar la materia";
        document.getElementById("alertaError")!.style.display = "block";

        setTimeout(() => {
          document.getElementById("alertaError")!.style.display = "none";
        }, 3000);
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

