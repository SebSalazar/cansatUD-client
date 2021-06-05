import { Component } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'CanSat-UD';

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    AOS.init();
  }
}
