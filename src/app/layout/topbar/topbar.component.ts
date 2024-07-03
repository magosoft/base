import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { NgClass } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [FormsModule, DropdownModule, NgClass],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  public countries: any;
  public selectedCountry: any;
  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;
  constructor(
    public layoutService: LayoutService,
    private config: PrimeNGConfig,
    private translateService: TranslateService
  ) {
    this.countries = [{ code: 'us' }, { code: 'es' }, { code: 'br' }];
    this.selectedCountry = this.countries[0];
  }
  translate(lang: string): void {
    if (lang == 'br') {
      this.translateService.use('pt-br');
    } else if (lang == 'us') {
      this.translateService.use('en');
    } else {
      this.translateService.use('es');
    }
    this.translateService
      .get('primeng')
      .subscribe((res) => this.config.setTranslation(res));
  }
}
