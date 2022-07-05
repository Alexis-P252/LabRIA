import { Component, OnInit } from '@angular/core';
import { DocumentosService } from '../services/documentos.service';
import { Documento } from "../interfaces"
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

  isLoading: boolean = true;

  alertSuccess : string = "";
  alertError : string = "";

  token: string | null = null;

  imgBase64 : string = "";

  Documentos: any;
  // Linkeada al formulario de crear un nuevo documento
  DocumentoNew: Documento = {id: 0,titulo:"",tipo:"",documentoPDF:"",activo:true};
  // Linkeada al formulario de editar una noticia
  DocumentoEdit: Documento = {id: 0,titulo:"",tipo:"",documentoPDF:"",activo:true};

  limit = 9;
  offset = 0;
  nro_paginas : number = 1;

  public paginas : Array<number> = [];
  public pagina_selecionada: number = this.nro_paginas;

  constructor(
    private documentosServ: DocumentosService, private modalService: NgbModal, private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    this.token = localStorage.getItem('token');

    this.documentosServ.getDocumentos(this.offset,this.limit).subscribe( data => {
      this.Documentos = data;
      console.log(this.Documentos);
    

      this.nro_paginas = this.Documentos.size / this.limit;
      if(this.Documentos.size % this.limit != 0){
        this.nro_paginas++;
      }
  
      this.paginas = [];
      for(let i = 1; i <= this.nro_paginas; i++){
        this.paginas.push(i);
      }  
    },
    error => {
      this.alertError = "Error al cargar los documentos";
      document.getElementById("alertaError")!.style.display = "block";

      setTimeout(() => {
        document.getElementById("alertaError")!.style.display = "none";
      }
      , 3000);
    },
    () => { this.isLoading = false; }
    );
  }

  cambiarPagina(event: any){

    this.pagina_selecionada = event.value;
    this.offset = (this.pagina_selecionada - 1) * this.limit;
    this.ngOnInit();
  }

  addDocumento(){

    if(this.DocumentoNew.tipo == ""){
      this.DocumentoNew.tipo = "DATOS_DE_INTERES";
    }

    if(this.DocumentoNew.titulo  == ""){
      this.alertError = "Debe ingresar un titulo";
      document.getElementById("alertaError")!.style.display = "block";

      setTimeout(() => {
        document.getElementById("alertaError")!.style.display = "none";
      }, 3000);
    }
    
    else{
       this.documentosServ.newDocumento(this.DocumentoNew).subscribe( data => {

          this.ngOnInit();
           this.alertSuccess = "Documento creado correctamente";
           document.getElementById("alertaSuccess")!.style.display = "block";
  
           setTimeout(() => {
             document.getElementById("alertaSuccess")!.style.display = "none";
           }, 3000);
      },
      error => {
         this.alertError = "Error al crear el documento";
         document.getElementById("alertaError")!.style.display = "block";
  
         setTimeout(() => {
           document.getElementById("alertaError")!.style.display = "none";
         }, 3000);
       }
       )
    }
  }

  editDocumento(){
    if(this.model == "Si"){
      this.DocumentoEdit.activo = true;
    }
    else{
      this.DocumentoEdit.activo = false;
    }

    if(this.DocumentoEdit.titulo  == ""){
      this.alertError = "Debe ingresar un titulo";
      document.getElementById("alertaError")!.style.display = "block";

      setTimeout(() => {
        document.getElementById("alertaError")!.style.display = "none";
      }, 3000);
    }
    else{

      this.documentosServ.updateDocumento(this.DocumentoEdit).subscribe( data => {
          this.ngOnInit();
          this.alertSuccess = "Documento editado correctamente";
          document.getElementById("alertaSuccess")!.style.display = "block";
  
          setTimeout(() => {
            document.getElementById("alertaSuccess")!.style.display = "none";
          }, 3000);
      },
      error => {
        this.alertError = "Error al editar el documento";
        document.getElementById("alertaError")!.style.display = "block";
  
        setTimeout(() => {
          document.getElementById("alertaError")!.style.display = "none";
        }, 3000);
       
      })
    }
  }


  handleUpload(event: any) {
    
    const file = event.target.files[0];

    if(!file){
      document.getElementById("error-empty-pdf")!.style.display = "block";
      const btn = document.getElementById("btnAgregarDocumento") as HTMLButtonElement | null;
      btn!.disabled = true;
    }
    else{

      document.getElementById("error-empty-pdf")!.style.display = "none";
      const btn = document.getElementById("btnAgregarDocumento") as HTMLButtonElement | null;
      btn!.disabled = false;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgBase64 = reader.result as string;
        this.DocumentoNew.documentoPDF = this.imgBase64;
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
        this.DocumentoEdit.documentoPDF = this.imgBase64;
      }
    }

  }

  onClcikDownloadPDF(pdf: string){
    this.downloadPdf(pdf, "Documento");
  }

  downloadPdf(base64String: string, nombreDocumento: string){
    const link = document.createElement("a");
    link.href = base64String;
    link.download = nombreDocumento+".pdf";
    link.click();
  }


  sanitizePDF(pdf: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdf);
  }
      



/* 
  --------------------------------------------------------------
  Modal NGBootstrap 
  --------------------------------------------------------------
  */

  closeResult = '';
      
  // Esta funcion se ejecuta al abrir el modal, en este caso al presionar el boton Eliminar de una noticia
  open(content: any, documento:Documento) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
    this.DocumentoEdit =  JSON.parse(JSON.stringify(documento));

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


  model = "Si";

}
