import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FuentesDirective } from './directivas/fuentes.directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EstudiantesFormComponent } from './components/estudiantes-form/estudiantes-form.component';
import { EstudiantesListComponent } from './components/estudiantes/estudiantes-list/estudiantes-list.component';
import { EstudiantesDetailsComponent } from './components/estudiantes/estudiantes-details/estudiantes-details.component';
import { RouterModule } from '@angular/router';
import { EstudiantesRoutingModule } from './components/estudiantes/estudiantes-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MaterialModule } from './shared/materials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';

const appRoutes = [
  { path: 'add-edit-estudiantes', component: EstudiantesFormComponent },
  { path: 'estudiantes', loadChildren: () => import('./components/estudiantes/estudiantes.module').then(m => m.EstudiantesModule) },
  { path: '', redirectTo: '/estudiantes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    EstudiantesFormComponent,
    EstudiantesListComponent,
    EstudiantesDetailsComponent,
    NavbarComponent,
    PageNotFoundComponent,
    FuentesDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    EstudiantesRoutingModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
