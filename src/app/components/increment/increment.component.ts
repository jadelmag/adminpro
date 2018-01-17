import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: []
})
export class IncrementComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() title: string;
  @Input() progress: number;

  @Output() changeValue: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.title = 'Título';
    this.progress = 0;
  }

  ngOnInit() {
  }

  onChange( newValue: number ) {

    // let elemHTML: any = document.getElementsByName('progress')[0];

    // tslint:disable-next-line:curly
    if (newValue >= 100) this.progress = 100;
    // tslint:disable-next-line:curly
    else if (newValue <= 0) this.progress = 0;
    // tslint:disable-next-line:curly
    else this.progress = newValue;

    // elemHTML.value = Number( this.progress );
    this.txtProgress.nativeElement.value = this.progress;

    this.changeValue.emit(this.progress);

    this.txtProgress.nativeElement.focus();
  }

  updateValue( value: number ) {

    this.progress += value;
    // tslint:disable-next-line:curly
    if (this.progress >= 100) this.progress = 100;
    // tslint:disable-next-line:curly
    if (this.progress <= 0) this.progress = 0;

    this.changeValue.emit( this.progress );
  }

}
