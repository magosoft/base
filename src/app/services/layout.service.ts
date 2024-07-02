import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface LayoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
showProfileSidebar() {
throw new Error('Method not implemented.');
}
onMenuToggle() {
throw new Error('Method not implemented.');
}
  private overlayOpen: Subject<any>;
  public overlayOpen$: any;
  public state: LayoutState;

  constructor() {
    this.overlayOpen = new Subject<any>();
    this.overlayOpen$ = this.overlayOpen.asObservable();
    this.state = {
      staticMenuDesktopInactive: false,
      overlayMenuActive: false,
      profileSidebarVisible: false,
      configSidebarVisible: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
    };
  }
}
