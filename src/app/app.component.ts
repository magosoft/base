import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'base';
  constructor() {
    let r = {
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
    }
  }
}
