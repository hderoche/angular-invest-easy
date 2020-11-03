import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.sass']
})
export class TagsComponent implements OnInit {

  @Input() listTags: string[];
  @Output() selectedTags: string[];

  selectedChips: any[] = [];

  constructor() {
    function changeSelected(parameter: string, query: string): void {
      const index = this.selectedChips.indexOf(query);
      if (index >= 0) {
        this.selectedChips.splice(index, 1);
      } else {
        this.selectedChips.push(query);
      }
      console.log('this.selectedChips: ' + this.selectedChips);
    }
  }

  ngOnInit(): void {
  }
}



