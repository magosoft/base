import { Injectable, effect, signal } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppConfig {
  inputStyle: string;
  colorScheme: string;
  theme: string;
  ripple: boolean;
  menuMode: string;
  scale: number;
}

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

  private overlayOpen: Subject<any>;
  private configUpdate: Subject<AppConfig>;
  public overlayOpen$: any;
  public configUpdate$: any;
  public state: LayoutState;
  private _config: AppConfig = {
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-indigo',
    scale: 14,
  };

  public config = signal<AppConfig>(this._config);

  constructor() {
    this.overlayOpen = new Subject<any>();
    this.configUpdate = new Subject<AppConfig>();
    this.overlayOpen$ = this.overlayOpen.asObservable();
    this.configUpdate$ = this.configUpdate.asObservable();

    this.state = {
      staticMenuDesktopInactive: false,
      overlayMenuActive: false,
      profileSidebarVisible: false,
      configSidebarVisible: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
    };
    effect(() => {
      const config = this.config();
      this.changeScale(config.scale);
      this.onConfigUpdate();
    });
  }

  showProfileSidebar(): void {
    this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
    if (this.state.profileSidebarVisible) {
      this.overlayOpen.next(null);
    }
  }

  onMenuToggle(): void {
    if (this.isOverlay()) {
      this.state.overlayMenuActive = !this.state.overlayMenuActive;
      if (this.state.overlayMenuActive) {
        this.overlayOpen.next(null);
      }
    }
    if (this.isDesktop()) {
      this.state.staticMenuDesktopInactive = !this.state.staticMenuDesktopInactive;
    } else {
      this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;
      if (this.state.staticMenuMobileActive) {
        this.overlayOpen.next(null);
      }
    }
  }
  translate(str: string): void {

  }
  isDesktop() {
    return window.innerWidth > 991;
  }
  onConfigUpdate() {
    this._config = { ...this.config() };
    this.configUpdate.next(this.config());
  }

  changeScale(value: number): void {
    document.documentElement.style.fontSize = `${value}px`;
  }

  isOverlay(): boolean {
    return this.config().menuMode === 'overlay';
  }
}
