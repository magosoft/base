import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';
import { Subscription, filter } from 'rxjs';
import { MenuService } from './menu.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: '[app-menuitem]',
  standalone: true,
  imports: [RouterModule, NgClass],
  animations: [
    trigger('children', [
      state('collapsed', style({
        height: '0'
      })),
      state('expanded', style({
        height: '*'
      })),
      transition('collapsed <=> expanded', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
  templateUrl: './menuitem.component.html',
  styleUrl: './menuitem.component.scss'
})
export class MenuitemComponent implements OnInit, OnDestroy {

  @Input() item: any;
  @Input() index: number;
  @Input() @HostBinding('class.layout-root-menuitem') root: boolean;
  @Input() parentKey: string;

  public key: string;
  public active: boolean;
  public menuSourceSubscription: Subscription;
  public menuResetSubscription: Subscription;
  constructor(
    public layoutService: LayoutService,
    private cd: ChangeDetectorRef,
    public router: Router,
    private menuService: MenuService
  ) {
    this.index = 0;
    this.item = {};
    this.root = false;
    this.parentKey = '';
    this.key = '';
    this.active = false;
    this.menuSourceSubscription = this.menuService.menuSource$.subscribe();
    this.menuResetSubscription = this.menuService.resetSource$.subscribe();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(params => {
        if (this.item.routerLink) {
          this.updateActiveStateFromRoute();
        }
      });
  }

  ngOnInit(): void {
    console.log(this.item);
    this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);
    if (this.item.routerLink) {
      this.updateActiveStateFromRoute();
    }
  }

  ngOnDestroy(): void {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe();
    }
    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe();
    }
  }

  itemOnClick($event: MouseEvent): void {
    if (this.item.disabled) {
      $event.preventDefault();
      return;
    }
    if (this.item.command) {
      this.item.command({ originalEvent: $event, item: this.item });
    }
    if (this.item.items) {
      this.active = !this.active;
    }
    this.menuService.onMenuStateChange({ key: this.key });
  }

  updateActiveStateFromRoute(): void {
    let activeRoute = this.router.isActive(this.item.routerLink[0], { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' });
    if (activeRoute) {
      this.menuService.onMenuStateChange({ key: this.key, routeEvent: true });
    }
  }

  get submenuAnimation() {
    return this.root ? 'expanded' : (this.active ? 'expanded' : 'collapsed');
  }

  @HostBinding('class.active-menuitem')
  get activeClass() {
    return this.active && !this.root;
  }
}
