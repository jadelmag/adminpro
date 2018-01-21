import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphics1',
  templateUrl: './graphics1.component.html',
  styles: []
})
export class Graphics1Component implements OnInit {

  graficos: any = {
    'grafico1': {
      'labels': ['Android', 'iOS', 'Ionic'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'leyenda': 'You develop mobile apps with'
    },
    'grafico2': {
      'labels': ['Man', 'Woman'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'leyenda': 'Users connected'
    },
    'grafico3': {
      'labels': ['Yes', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'leyenda': 'Do you like this project?'
    },
    'grafico4': {
      'labels': ['Yes', 'No'],
      'data':  [85, 15],
      'type': 'doughnut',
      'leyenda': 'Is usefull?'
    },
  };

  constructor() { }

  ngOnInit() { }

}
