import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-card',
  templateUrl: './landing-card.component.html',
  styleUrls: ['./landing-card.component.css']
})
export class LandingCardComponent implements OnInit {

  @Input() itemList: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
