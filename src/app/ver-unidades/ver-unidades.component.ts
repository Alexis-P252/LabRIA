import { Component, OnInit } from '@angular/core';
import {UnidaesCurricularesService} from '../services/unidades-curriculares.service';
import { UnidadCurricular } from '../interfaces';


import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ver-unidades',
  templateUrl: './ver-unidades.component.html',
  styleUrls: ['./ver-unidades.component.css']
})
export class VerUnidadesComponent implements OnInit {

  isLoading: boolean = true;
  private routeSub: Subscription = new Subscription;
  id: number = 0;
  unidad: any;
  

  constructor(private unidadesServ: UnidaesCurricularesService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // Obtengo la id de la URL
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.unidadesServ.getUnidadCurricular(this.id).subscribe(
      (data) => {
        this.unidad = data;
      },
      (error) => {
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  onClcikDownloadPDF(pdf: string){
    this.downloadPdf(pdf, "Documento_UC");
  }

  downloadPdf(base64String: string, nombreDocumento: string){
    const link = document.createElement("a");
    link.href = base64String;
    link.download = nombreDocumento+".pdf";
    link.click();
  }

}
