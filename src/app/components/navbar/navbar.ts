import { Component, inject } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.html',
    styleUrl: './navbar.scss',
    imports: [RouterLink, RouterLinkActive]
})
export class Navbar {
  private router = inject(Router);

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }
}
