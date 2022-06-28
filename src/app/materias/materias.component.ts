import { Component, OnInit } from '@angular/core';
import { Materia } from "../interfaces"
import { MateriasService } from "../services/materias.service";


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

  constructor(private materiasServ: MateriasService) { }

  ngOnInit(): void {
    this.getAllMaterias();
  }

  getAllMaterias(){
    this.materiasServ.getMaterias().subscribe( data => {
      this.Materias = data;
      console.log(this.Materias);
    })
  }







  
}

