import { Component, OnInit } from '@angular/core';
import { DocumentosService } from '../services/documentos.service';
import { Documento } from "../interfaces"

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

  Documentos: any;

  constructor(
    private documentosServ: DocumentosService
  ) { }

  ngOnInit(): void {
    this.documentosServ.getDocumentos(0,15).subscribe( data => {
      this.Documentos = data;
      console.log(this.Documentos);
    }
    );
  }

}
