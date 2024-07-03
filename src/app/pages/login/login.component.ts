import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterModule } from '@angular/router';

import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, TranslateModule, ButtonModule, RippleModule, InputTextModule, PasswordModule, DropdownModule, CheckboxModule],
  providers: [TranslatePipe],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
  public countries: any;
  public selectedCountry: any;
  password: string = '';
  constructor(private translateService: TranslateService) {
    this.countries = [{ code: 'es', lang: 'es' }, { code: 'us', lang: 'en' }, { code: 'br', lang: 'pt-br' }];
    this.selectedCountry = this.countries[0];    
  }
  ngOnInit(): void {
    const lang = this.translateService.getDefaultLang();
    this.selectedCountry = this.countries.find((ele: any) => ele.lang == lang);
  }
  translate(lang: string): void {
    console.log(lang);
    this.translateService.use(lang);    
  }
}
