import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  providers: [TranslatePipe],
  templateUrl: './notfound.component.html',
})
export class NotfoundComponent {
  constructor(private translate: TranslateService) {
    this.translate.use('es');
  }
}
