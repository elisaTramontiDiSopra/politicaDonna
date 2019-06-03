import { Component } from '@angular/core';

@Component({
  styleUrls: ['./header.component.sass'],
  templateUrl: './header.component.html',
  selector: 'app-header'
})

export class HeaderComponent {
  public isCollapsed = false;
}
