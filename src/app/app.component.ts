import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  TranslateModule,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  providers: [TranslateService, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'base';
  constructor(
    private config: PrimeNGConfig,
    private translateService: TranslateService
  ) {
    this.translateService.addLangs(['en', 'es','pt-br']);
    this.translateService.setDefaultLang('es');
    /*let r = {
      uno: 'u',
      dos: 'tipo',
      tres: {
        tres_uno: '',
        tres_dos: '',
      },
      cuatro: '',
      mil: '',
    };
    for (var key in r) {

      console.log(key);
      console.log();
    }*/
  }
  ngOnInit() {    
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang?.match(/en|es|pt-br/) ? browserLang : 'es');  
    /*this.config.overlayOptions = {
      mode: 'modal',
    };*/
  }

}
