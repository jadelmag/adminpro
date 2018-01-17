import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progress1: number;
  progress2: number;

  constructor() {
    this.progress1 = 0;
    this.progress2 = 0;
  }

  ngOnInit() {
  }

}
