import {Directive, ElementRef, Input, NgModule, OnInit} from '@angular/core';

const CLASS_NAME = 'alx-printable'

@Directive({
  selector: '[alxPrint]',
  exportAs: 'alxPrint'
})
export class AlxPrintDirective implements OnInit {
  // When set to true, the element itself gets hidden but visible to the print
  @Input() hidden = false;
  // If you need a different printing function, provide its function here.
  // Default is window.print();
  @Input() printFn?: () => void;

  hostElement: HTMLElement;

  constructor(private host: ElementRef<HTMLElement>) {
    this.hostElement = this.host.nativeElement;
  }

  ngOnInit() {
    if (this.hidden) {
      this.hostElement.style.display = 'none';
    }
  }

  print(element?: HTMLElement, options?: {
    printFn?: () => void;
  }) {
    const elementToPrint = element ?? this.hostElement;
    const printContent = elementToPrint.innerHTML;
    const printableDiv = document.createElement('div');
    printableDiv.className = elementToPrint.className;
    printableDiv.classList.add(CLASS_NAME);
    printableDiv.innerHTML = printContent;
    document.body.appendChild(printableDiv);
    if (options?.printFn) {
      options?.printFn();
    } else if (this.printFn) {
      this.printFn();
    } else {
      window.print();
    }
    document.body.removeChild(printableDiv);
    printableDiv.remove();
  }
}

@NgModule({
  declarations: [AlxPrintDirective],
  imports: [],
  exports: [AlxPrintDirective]
})
export class AlxPrintModule {
}
