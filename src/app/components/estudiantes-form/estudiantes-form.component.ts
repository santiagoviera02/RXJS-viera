import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EstudiantesService } from 'src/app/shared/estudiantes.service';


@Component({
  selector: 'app-estudiantes-form',
  templateUrl: './estudiantes-form.component.html',
  styleUrls: ['./estudiantes-form.component.scss']
})
export class EstudiantesFormComponent implements OnInit, OnDestroy {
  estudiantesForm: FormGroup;
  estudianteToEdit: any;
  subscriptions: Subscription;

  constructor(private fb: FormBuilder, private estudiantesService: EstudiantesService, private router: Router) { }

  ngOnInit(): void {
    this.subscriptions = new Subscription();
    this.estudiantesForm = this.fb.group({
      nombre: ['', Validators.required],
      materia: ['', Validators.required],
      calificacion: ['', Validators.required],
      profesor: ['', Validators.required]

    })
    this.subscriptions.add(this.estudiantesService.getEstudiantesToEdit().subscribe(
      (val) => this.estudianteToEdit = val
    ))


    if (this.estudianteToEdit) {
      this.estudiantesForm.get('nombre')?.patchValue(this.estudianteToEdit.nombre);
      this.estudiantesForm.get('materia')?.patchValue(this.estudianteToEdit.materia);
      this.estudiantesForm.get('calificacion')?.patchValue(this.estudianteToEdit.calificacion);
      this.estudiantesForm.get('profesor')?.patchValue(this.estudianteToEdit.profesor);
    }
  }

  onSubmit() {
    let productos = [];
    this.estudiantesService.getEstudiantesList().subscribe(
      val => productos = val
    )
    let index = 1;
    if (productos.length > 0 && !this.estudianteToEdit) {
      index = productos.length + 1;
      this.estudiantesForm.value['id'] = index;
      productos.push(this.estudiantesForm.value);
    } else if (productos.length === 0 && !this.estudianteToEdit) {
      this.estudiantesForm.value['id'] = index;
      productos.push(this.estudiantesForm.value);
    }
    if (this.estudianteToEdit) {
      let indexOfProduct = productos.findIndex((product) => product.id === this.estudianteToEdit.id);
      productos[indexOfProduct] = this.estudiantesForm.value;
    }
    this.estudiantesService.estudianteList = productos!
    this.router.navigate(['/estudiantes/list']);
  }
  volver() {
    this.router.navigate(['/estudiantes/list']);
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
