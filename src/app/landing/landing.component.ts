import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  gridUnits = [
    ['tetoekotk', 'Easy to use', 'oijvreiorjvie'],
    ['tetoekotk', 'Easy to use', 'oijvreiorjvie'],
    ['tetoekotk', 'Easy to use', 'oijvreiorjvie'],
    ['tetoekotk', 'Easy to use', 'oijvreiorjvie'],
    ['tetoekotk', 'Easy to use', 'oijvreiorjvie'],
    ['tetoekotk', 'Easy to use', 'oijvreiorjvie'],
  ];

  constructor() { }

  ngOnInit(): void {
  }


}
