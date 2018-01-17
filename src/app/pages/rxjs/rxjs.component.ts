import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscription = this.returnObservable()
    .subscribe(
      num => console.log('Subs ', num ),
      error => console.log('Error in observer: ', error),
      () => console.log('Observer has finished')
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {

    return new Observable( observer => {

      let count = 0;

      const interval = setInterval( () => {

        count += 1;

        const out = {
          value: count
        };

        observer.next( out );

        // if ( count === 3) {
        //   clearInterval( interval );
        //   observer.complete();
        // }

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
        return true;
      } else {
        return false;
      }
    });
  }

}
