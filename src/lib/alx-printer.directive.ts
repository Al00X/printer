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

  private _printableDiv?: HTMLDivElement;

  constructor(private host: ElementRef<HTMLElement>) {
    this.hostElement = this.host.nativeElement;
  }

  ngOnInit() {
    if (this.hidden) {
      this.hostElement.style.display = 'none';
    }
  }

  async print(element?: HTMLElement, options?: {
    printFn?: () => (void | Promise<void>);
  }) {
    this.prepare(element);
    if (options?.printFn) {
      const res = options?.printFn();
      if (res instanceof Promise) {
        await res;
      }
    } else if (this.printFn) {
      this.printFn();
    } else {
      window.print();
    }
    this.cleanup();
  }

  prepare(element?: HTMLElement) {
    const elementToPrint = element ?? this.hostElement;
    const printContent = elementToPrint.innerHTML;
    this._printableDiv = document.createElement('div');
    this._printableDiv.className = elementToPrint.className;
    this._printableDiv.classList.add(CLASS_NAME);
    this._printableDiv.innerHTML = printContent;
    document.body.appendChild(this._printableDiv);
  }
  cleanup() {
    if (!this._printableDiv) return;
    document.body.removeChild(this._printableDiv);
    this._printableDiv.remove();
    this._printableDiv = undefined;
  }
}

@NgModule({
  declarations: [AlxPrintDirective],
  imports: [],
  exports: [AlxPrintDirective]
})
export class AlxPrintModule {
}
