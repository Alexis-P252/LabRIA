import { Component, OnInit } from '@angular/core';
import { DocumentosService } from '../services/documentos.service';
import { Documento } from "../interfaces"

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-verdocumentos',
  templateUrl: './verdocumentos.component.html',
  styleUrls: ['./verdocumentos.component.css']
})
export class VerdocumentosComponent implements OnInit {

  private routeSub: Subscription = new Subscription;

  public categoria: string = "";
  public Documentos: any;
  public pdf: string = "";

  isLoading: boolean = true;

  constructor(private documentosServ: DocumentosService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private modalService: NgbModal) { }

  ngOnInit(): void {

    // Obtengo la categoria de la URL
    this.routeSub = this.route.params.subscribe(params => {
      this.categoria = params['categoria'];
    });

    // Ahora obtengo los documentos de la API
    this.documentosServ.getDocumentosActivos(this.categoria).subscribe( data => {
      this.Documentos = data;
      
    }, error => {
     
    },
    () => {
      this.isLoading = false;
    }
    );
  }

  

  
  sanitizePDF(pdf: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdf);
  }


  openFullscreen(content, documentoPDF) {
    this.modalService.open(content, { fullscreen: true });
    this.pdf = documentoPDF;
  }

}
