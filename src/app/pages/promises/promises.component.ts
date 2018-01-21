import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  count: number;
  message: string;
  isRunning: boolean;

  constructor() {
    this.count = 0;
    this.message = '';
    this.isRunning = false;
  }

  ngOnInit() {
  }

  promiseExample() {

    this.isRunning = true;
    const promise = new Promise( (resolve, reject) => {
      const interval = setInterval( () => {
        this.count += 1;
        console.log(this.count);

        if (this.count === 5) {
          resolve();
          clearInterval(interval);
        }
      }, 1000);

    });

    promise.then( () => {
      this.message = 'Finish!';
      console.log('Finish!');
    })
    .catch(error => {
      this.message = 'Error: ' + error;
      console.log('Error: ', error);
    });
  }

  clear() {
    console.log('Hola');
    this.count = 0;
    this.message = '';
    this.isRunning = false;
  }
}
