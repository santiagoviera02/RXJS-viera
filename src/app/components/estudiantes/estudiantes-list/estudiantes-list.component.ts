import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Subscription, Observable } from 'rxjs';
import { EstudiantesService } from 'src/app/shared/estudiantes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../../../shared/service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './estudiantes-list.component.html',
  styleUrls: ['./estudiantes-list.component.scss']
})
export class EstudiantesListComponent implements OnInit, OnDestroy {
  estudiantes: any = [];
  subscriptions: Subscription;
  @ViewChild('table') table: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['nombre', 'materia', 'calificacion', 'profesor', 'eliminar'];


  character$: Subscription;
  character: any;

  constructor(private router: Router, private estudiantesService: EstudiantesService, private serviceService: ServiceService) {
    this.character$ = this.serviceService.getCharacterO$(1).subscribe(
      (character: any) => this.character = character
    );
  }

  ngOnInit(): void {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.estudiantesService.getEstudiantesList().subscribe(
      (val) => this.estudiantes = val
    )
    )
  }

  onClickRow(el: any) {
    this.estudiantesService.estudianteToEdit = el;
    this.router.navigate(['/add-edit-estudiantes']);
  }

  borrarEstudiante(el: any) {
    let index = this.estudiantes.findIndex((student: { id: any; }) => student.id === el.id);
    this.estudiantes.splice(index, 1);
    this.table.renderRows();
    this.estudiantesService.estudianteList = this.estudiantes!;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddElement() {
    this.router.navigate(['/add-edit-estudiantes']);
  }

  ngOnDestroy() {
    this.character$.unsubscribe();
  }
}


