import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  message: string;
  isRunning: boolean;
  isDone: boolean;
  subscription: Subscription;

  constructor() {
    this.message = 'Ready...';
    this.isRunning = false;
    this.isDone = false;
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.clear();
  }

  initObservable() {
    this.subscription = this.returnObservable()
    .subscribe(
      num => {
        this.message = 'Subs: ' + num;
        console.log('Subs: ', num );
      },
      error => {
        this.message = 'Error in observer: ' + error;
        console.log('Error in observer: ', error);
      },
      () => {
        this.message = 'Observer has finished!!';
        console.log('Observer has finished');
        this.isDone = true;
      });
  }

  unsubscribe() {
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {

    return new Observable( observer => {
      this.isRunning = true;
      let count = 0;

      const interval = setInterval( () => {

        count += 1;

        const out = {
          value: count
        };

        observer.next( out );

        if ( count === 20) {
          clearInterval( interval );
          observer.complete();
        }

        // if ( count === 2) {
        //   observer.error('crash!!');
        // }

      }, 500);

    })
    .retry(2)
    .map( (response: any) => {
      return response.value;
    })
    .filter( (value, index) => {

      if ( value % 2 === 1) {
        return false;
      } else {
        return true;
      }
    });
  }

  clear() {
    this.message = 'Ready...';
    this.isRunning = false;
    this.isDone = false;
  }

}
