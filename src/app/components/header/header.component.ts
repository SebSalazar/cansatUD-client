import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toDatos(){
    document.getElementById('datax').scrollIntoView({behavior: 'smooth'});
  }

  toRedes(){
    document.getElementById('redex').scrollIntoView({behavior: 'smooth'});
  }
}
