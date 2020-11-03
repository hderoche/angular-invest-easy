import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {

  token = localStorage.getItem('token');

  constructor() { }

  ngOnInit(): void {
  }


}
