import { Component, OnInit } from '@angular/core';
import {UnidaesCurricularesService} from '../services/unidades-curriculares.service';
import { PreviasService } from '../services/previas.service';
import { MateriasService } from '../services/materias.service'; 
import {Materia, UnidadCurricular, UnidadCurricular2, Previa} from '../interfaces';

import {NgbModal, ModalDismissReasons, NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-unidades-curriculares',
  templateUrl: './unidades-curriculares.component.html',
  styleUrls: ['./unidades-curriculares.component.css'],
  providers: [NgbNavConfig]
})
export class UnidadesCurricularesComponent implements OnInit {

  token: string = null;

  alertSuccess: string = "";
  alertError: string = "";
  imgBase64: string = "";
  id_seleccionada: number = 0;
  previa_seleccionada: number = 0;
  previa_seleccionada_delete: number = 0
  tipoPrevia: string = "";

  idMateria: number = 0;
  materiaInterface: Materia = {id:0, nombre: "",  descripcion: "", creditosMinimos: 0};

  unidadNew: UnidadCurricular = {id:0, nombre:"", descripcion:"",creditos:0 , documento:"", semestre: 0, materia: this.materiaInterface, previas: []};

  unidadEdit: UnidadCurricular2 = {id:0, nombre:"", descripcion:"",creditos:0 , documento:"", semestre: 0, materia: this.materiaInterface, previas: []};
  previa: Previa = {unidadCurricular: 0, previa: 0, tipo: ""};

  unidades: any;
  materias: any;
  semestre1: UnidadCurricular[] = []; semestre2: UnidadCurricular[] = []; semestre3: UnidadCurricular[] = []; semestre4: UnidadCurricular[] = []; semestre5: UnidadCurricular[] = []; semestre6: UnidadCurricular[] = [];

  constructor(private unidadesServ: UnidaesCurricularesService, private previasServ: PreviasService, private materiasServ: MateriasService, private modalService: NgbModal, config: NgbNavConfig) { }

  

  ngOnInit(): void {

    this.token = localStorage.getItem('token');

    this.unidadesServ.getUnidadesCurriculares().subscribe(
      (unidades) => {
        this.unidades = unidades;

        for (let i = 0; i < this.unidades.length; i++) {
          if (this.unidades[i].semestre == 1) {
            this.semestre1.push(this.unidades[i]);
          } else if (this.unidades[i].semestre == 2) {
            this.semestre2.push(this.unidades[i]);
          } else if (this.unidades[i].semestre == 3) {
            this.semestre3.push(this.unidades[i]);
          } else if (this.unidades[i].semestre == 4) {
            this.semestre4.push(this.unidades[i]);
          } else if (this.unidades[i].semestre == 5) {
            this.semestre5.push(this.unidades[i]);
          } else if (this.unidades[i].semestre == 6) {
            this.semestre6.push(this.unidades[i]);
          }
        }

        this.obtenerMaterias();
    })
  }

  obtenerMaterias(){
    this.materiasServ.getMaterias().subscribe( data => {
      this.materias = data;
    })
  }

  addUnidadCurricular(){

    if(this.unidadNew.nombre == "" || this.unidadNew.descripcion == "" || this.unidadNew.creditos == 0 || this.unidadNew.semestre < 1 || this.unidadNew.semestre > 6 || this.idMateria == 0){
      this.alertError = "Todos los campos son obligatorios, debes seleccionar una materia";
      document.getElementById("alertaError")!.style.display = "block";

      setTimeout(() => {
        document.getElementById("alertaError")!.style.display = "none";
      }, 3000);
    }
    else{
      this.unidadNew.materia = this.materias.find(materia => materia.id == this.idMateria);

      this.unidadesServ.newUnidadCurricular(this.unidadNew).subscribe(
        (data) => {
          this.semestre1 = []; this.semestre2 = []; this.semestre3 = []; this.semestre4 = []; this.semestre5 = []; this.semestre6 = [];
          this.ngOnInit();
          this.alertSuccess = "Unidad curricular agregada correctamente";
          document.getElementById("alertaSuccess")!.style.display = "block";

          setTimeout(() => {
            document.getElementById("alertaSuccess")!.style.display = "none";
          }, 3000);

          this.unidadNew = {id:0, nombre:"", descripcion:"",creditos:0 , documento:"", semestre: 0, materia: this.materiaInterface, previas: []};
          this.idMateria = 0;
          this.obtenerMaterias();
        },
        (error) => {
          this.alertError = "Error al agregar unidad curricular";
          document.getElementById("alertaError")!.style.display = "block";

          setTimeout(() => {
            document.getElementById("alertaError")!.style.display = "none";
          }, 3000);
        })
    }
  }

  editUnidadCurricular(){
    if(this.unidadEdit.nombre == "" || this.unidadEdit.descripcion == "" || this.unidadEdit.creditos == 0 || this.unidadEdit.semestre < 1 || this.unidadEdit.semestre > 6){
      this.alertError = "Todos los campos son obligatorios, semestre debe ser entre 1 y 6, creditos minimos debe ser mayor a 0";
      document.getElementById("alertaError")!.style.display = "block";

      setTimeout(() => {
        document.getElementById("alertaError")!.style.display = "none";
      }, 3000);
    }
    else{
      this.unidadesServ.updateUnidadCurricular(this.unidadEdit).subscribe(
        (data) => {
          this.semestre1 = []; this.semestre2 = []; this.semestre3 = []; this.semestre4 = []; this.semestre5 = []; this.semestre6 = [];
          this.ngOnInit();
          this.alertSuccess = "Unidad curricular editada correctamente";
          document.getElementById("alertaSuccess")!.style.display = "block";

          setTimeout(() => {
            document.getElementById("alertaSuccess")!.style.display = "none";
          }, 3000);

          this.unidadEdit = {id:0, nombre:"", descripcion:"",creditos:0 , documento:"", semestre: 0, materia: this.materiaInterface, previas: []};
          this.idMateria = 0;
          this.obtenerMaterias();
        }
        ,(error) => {
          this.alertError = "Error al editar unidad curricular";
          document.getElementById("alertaError")!.style.display = "block";

          setTimeout(() => {
            document.getElementById("alertaError")!.style.display = "none";
          }, 3000);
        }
      );
    }
  }

  deleteUnidadCurricular(){
    this.unidadesServ.deleteUnidadCurricular(this.id_seleccionada).subscribe(
      (data) => {
        this.semestre1 = []; this.semestre2 = []; this.semestre3 = []; this.semestre4 = []; this.semestre5 = []; this.semestre6 = [];
        this.ngOnInit();
        this.alertSuccess = "Unidad curricular eliminada correctamente";
        document.getElementById("alertaSuccess")!.style.display = "block";

        setTimeout(() => {
          document.getElementById("alertaSuccess")!.style.display = "none";
        }, 3000);

      },
      (error) => {
        this.alertError = "Error al eliminar unidad curricular";
        document.getElementById("alertaError")!.style.display = "block";

        setTimeout(() => {
          document.getElementById("alertaError")!.style.display = "none";
        }, 3000);
      }
    );
  }

  addPrevia(){
    if(this.previa_seleccionada == 0){
      this.alertError = "Debe seleccionar una unidad curricular";
      document.getElementById("alertaError")!.style.display = "block";

      setTimeout(() => {
        document.getElementById("alertaError")!.style.display = "none";
      }, 3000);
    }

    else if(this.previa_seleccionada == this.unidadEdit.id){
      this.alertError = "No puedes agregar una unidad curricular como previa a si misma";
      document.getElementById("alertaError")!.style.display = "block";

      setTimeout(() => {
        document.getElementById("alertaError")!.style.display = "none";
      }, 3000);
    }
    else if(this.tienePrevia(this.unidadEdit, this.previa_seleccionada)){
      this.alertError = "La unidad curricular ya tiene esa previa";
      document.getElementById("alertaError")!.style.display = "block";

      setTimeout(() => {
        document.getElementById("alertaError")!.style.display = "none";
      }, 3000);
    }
    else{
      this.previa.unidadCurricular = this.unidadEdit.id;
      this.previa.previa = this.previa_seleccionada;
      if(this.tipoPrevia == ""){
        this.previa.tipo = "Examen";
      }
      else{
        this.previa.tipo = this.tipoPrevia;
      }

      this.previasServ.newPrevia(this.previa).subscribe(
        (data) => {
          this.semestre1 = []; this.semestre2 = []; this.semestre3 = []; this.semestre4 = []; this.semestre5 = []; this.semestre6 = [];
          this.ngOnInit();
          this.alertSuccess = "Previa agregada correctamente";
          document.getElementById("alertaSuccess")!.style.display = "block";

          setTimeout(() => {
            document.getElementById("alertaSuccess")!.style.display = "none";
          }
          , 3000);
        },
        (error) => {
          this.alertError = "Error al agregar previa";
          document.getElementById("alertaError")!.style.display = "block";

          setTimeout(() => {
            document.getElementById("alertaError")!.style.display = "none";
          }
          , 3000);
        }
      );

    }
  }

  deletePrevia(){
    if(this.previa_seleccionada_delete == 0){
      this.alertError = "Debe seleccionar una previa";
      document.getElementById("alertaError")!.style.display = "block";

      setTimeout(() => {
        document.getElementById("alertaError")!.style.display = "none";
      }, 3000);
    }
    else{
      this.previasServ.deletePrevia(this.previa_seleccionada_delete).subscribe(
        (data) => {
          this.semestre1 = []; this.semestre2 = []; this.semestre3 = []; this.semestre4 = []; this.semestre5 = []; this.semestre6 = [];
          this.ngOnInit();
          this.alertSuccess = "Previa eliminada correctamente";
          document.getElementById("alertaSuccess")!.style.display = "block";

          setTimeout(() => {
            document.getElementById("alertaSuccess")!.style.display = "none";
          }
          , 3000);

        },
        (error) => {
          this.alertError = "Error al eliminar previa";
          document.getElementById("alertaError")!.style.display = "block";

          setTimeout(() => {
            document.getElementById("alertaError")!.style.display = "none";
          }
          , 3000);
        }
      );
    }
  }

 

  handleUpload(event: any) {
    
    const file = event.target.files[0];

    if(!file){
       document.getElementById("error-empty-pdf")!.style.display = "block";
       const btn = document.getElementById("btnAgregarUnidad") as HTMLButtonElement | null;
       btn!.disabled = true;
    }
    else{

      document.getElementById("error-empty-pdf")!.style.display = "none";
      const btn = document.getElementById("btnAgregarUnidad") as HTMLButtonElement | null;
      btn!.disabled = false;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgBase64 = reader.result as string;
        this.unidadNew.documento = this.imgBase64;
      }
    }
  }

  handleUploadEdit(event: any) {

    const file = event.target.files[0];

    if(!file){
      console.log("ERROR: No se selecciono ningun documento");
    }
    else{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgBase64 = reader.result as string;
        this.unidadEdit.documento = this.imgBase64;
      }
    }
  }


  // Esta funcion comprueba si una unidad curricular ya tiene como previa a la unidad con id pasada por parametro
  tienePrevia(unidad: UnidadCurricular2, id:number){
    for(let i = 0; i < unidad.previas.length; i++){
      if(unidad.previas[i].previa.id == id){
        return true;
      }
    }
    return false;
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
      
  // Esta funcion se ejecuta al abrir el modal, en este caso al presionar el boton Eliminar de una noticia
  open(content: any, unidad:UnidadCurricular) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
    this.id_seleccionada = unidad.id;

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
  open2(content2: any, unidad:UnidadCurricular) {

    this.unidadEdit =  JSON.parse(JSON.stringify(unidad));
    console.log(this.unidadEdit.previas);
    console.log(this.unidadEdit);  

    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult2 = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult2 = `Dismissed ${this.getDismissReason(reason)}`;
    });
     
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
