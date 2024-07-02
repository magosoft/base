import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface MenuChangeEvent {
  key: string;
  routeEvent?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuSource: Subject<MenuChangeEvent>;
  private resetSource: Subject<any>;
  public menuSource$: any;
  public resetSource$: any;
  constructor() {
    this.menuSource = new Subject<MenuChangeEvent>();
    this.resetSource = new Subject<any>();
    this.menuSource$ = this.menuSource.asObservable();
    this.resetSource$ = this.resetSource.asObservable();
  }

  onMenuStateChange($event: MenuChangeEvent): void {
    this.menuSource.next($event);
  }

  reset() {
    this.resetSource.next(true);
  }
}
