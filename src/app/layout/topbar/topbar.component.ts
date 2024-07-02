import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  constructor(public layoutService: LayoutService) { }

}
