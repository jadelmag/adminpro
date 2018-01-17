import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {

    let count = 0;

    const promise = new Promise( (resolve, reject) => {
      const interval = setInterval( () => {
        count += 1;
        console.log(count);
        if (count === 3) { resolve(); clearInterval(interval); }
      }, 1000);

    });

    promise.then( () => console.log('Finish!'))
      .catch(error => console.log('Error: ', error));
  }

  ngOnInit() {
  }

}
