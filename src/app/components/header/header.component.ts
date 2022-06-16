import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  toggleTheme = true;

  constructor() {}

  ngOnInit() {}

  onSwitchTheme() {
    this.toggleTheme = !this.toggleTheme;
    if (this.toggleTheme) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }
}
