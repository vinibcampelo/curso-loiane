import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements OnInit, OnDestroy,
 OnChanges, DoCheck, AfterContentChecked, AfterContentInit,
 AfterViewInit, AfterViewChecked {

  @Input() valorInicial: number = 10;

  constructor() {
    this.log('constructor');    
  }

  ngOnChanges() {
    this.log('ngOnChanges');
  }

  ngDoCheck() {
    this.log('ngDoCheck');
  }

  ngOnInit(){
    this.log('ngOnInit');
  }

  ngAfterContentInit() {
    this.log('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    this.log('ngAfterContentChecked');
  }

  ngAfterViewChecked() {
    this.log('ngAfterViewChecked');
  }

  ngAfterViewInit() {
    this.log('ngAfterViewInit');
  }

  ngOnDestroy() {
    this.log('ngOnDestroy');
  } 

  private log(hook: string) {
    console.log(hook)
  }

}
