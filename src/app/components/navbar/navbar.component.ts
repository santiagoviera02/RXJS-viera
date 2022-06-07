import { map, Observable, Subscription } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from '../../../../../RXJ-viera/src/app/shared/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  menu: Menu[] = [];
  menu$: Subscription;
  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.cargarMenu();
  }
  cargarMenu(): void {
    this.menuService.getMenu().subscribe(data => {

      this.menu = data;
    });
  }
  ngOnDestroy(): void {
    this.menu$.unsubscribe();
  }
}
