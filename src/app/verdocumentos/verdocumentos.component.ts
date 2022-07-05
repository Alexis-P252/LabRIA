import { Component, OnInit } from '@angular/core';
import { DocumentosService } from '../services/documentos.service';
import { Documento } from "../interfaces"

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-verdocumentos',
  templateUrl: './verdocumentos.component.html',
  styleUrls: ['./verdocumentos.component.css']
})
export class VerdocumentosComponent implements OnInit {

  private routeSub: Subscription = new Subscription;

  public categoria: string = "";
  public Documentos: any;

  isLoading: boolean = true;

  constructor(private documentosServ: DocumentosService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    // Obtengo la categoria de la URL
    this.routeSub = this.route.params.subscribe(params => {
      this.categoria = params['categoria'];
    });

    // Ahora obtengo los documentos de la API
    this.documentosServ.getDocumentosActivos(this.categoria).subscribe( data => {
      this.Documentos = data;
      console.log(this.Documentos);
    }, error => {
      console.log(error);
    },
    () => {
      this.isLoading = false;
    }
    );
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

}
