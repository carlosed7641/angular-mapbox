import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  name: string
  route: string
}

@Component({
  selector: 'maps-side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styles: `
    li {
      cursor: pointer;
      transition: 0.2s all;
    }

    ul {
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 999;
    }
  `
})
export class SideMenuComponent {

   menuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'Fullscreen' },
    { route: '/maps/zoom-range', name: 'Zoom-range' },
    { route: '/maps/markers', name: 'Markers' },
    { route: '/maps/properties', name: 'Houses' },
    { route: '/alone', name: 'Alone Page' },
   ]
}
