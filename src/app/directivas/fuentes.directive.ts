import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFuentes]'
})
export class FuentesDirective {
  constructor(private elRef: ElementRef) {
    elRef.nativeElement.style.fontSize = '20px';
  }

}
