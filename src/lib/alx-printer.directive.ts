import {Directive, ElementRef, Input, NgModule, OnDestroy, OnInit} from '@angular/core';

const CLASS_NAME = 'alx-printable'

@Directive({
  selector: '[alxPrint]',
  exportAs: 'alxPrint'
})
export class AlxPrintDirective implements OnInit, OnDestroy {
  // When set to true, the element itself gets hidden but visible to the print
  @Input() hidden = false;
  // If you need a different printing function, provide its function here.
  // Default is window.print();
  @Input() printFn?: () => void;

  hostElement: HTMLElement;

  private _printableDiv?: HTMLDivElement;
  private _mediaQueryList?: MediaQueryList;
  private _onMediaQueryChange?: (e: MediaQueryListEvent) => void;
  private _onAfterPrint?: () => void;

  constructor(private host: ElementRef<HTMLElement>) {
    this.hostElement = this.host.nativeElement;
  }

  ngOnInit() {
    if (this.hidden) {
      this.hostElement.style.display = 'none';
    }

    if (window.matchMedia) {
      this._onMediaQueryChange = (e: MediaQueryListEvent) => {
        console.log(e);
        if (!e.matches) {
          this.cleanup();
        }
      }
      this._mediaQueryList = window.matchMedia('print');
      this._mediaQueryList.addEventListener('change', this._onMediaQueryChange);
    } else {
      this._onAfterPrint = () => {
        this.cleanup();
      }
      window.addEventListener('afterprint', this._onAfterPrint);
    }
  }

  ngOnDestroy() {
    if (this._mediaQueryList) {
      this._mediaQueryList?.removeEventListener('change', this._onMediaQueryChange!);
    } else {
      window.removeEventListener('afterprint', this._onAfterPrint!);
    }
  }

  // Start the printing process.
  // This function automatically prepares the document.
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
  }

  // Manually prepare the document.
  // This step is necessary before printing.
  prepare(element?: HTMLElement) {
    const elementToPrint = element ?? this.hostElement;
    const printContent = elementToPrint.innerHTML;
    this._printableDiv = document.createElement('div');
    this._printableDiv.className = elementToPrint.className;
    this._printableDiv.classList.add(CLASS_NAME);
    this._printableDiv.innerHTML = printContent;
    document.body.appendChild(this._printableDiv);
  }

  // Cleanup the document after printing. Reverts prepare!
  // This function is called after "media change" or "afterprint" event automatically.
  // If these events didn't help, call this on your own.
  cleanup() {
    if (!this._printableDiv) return;
    document.body.removeChild(this._printableDiv);
    this._printableDiv.remove();
    this._printableDiv = undefined;
    document.querySelectorAll(`body > .${CLASS_NAME}`).forEach(el => {
      el.remove();
    })
  }
}

@NgModule({
  declarations: [AlxPrintDirective],
  imports: [],
  exports: [AlxPrintDirective]
})
export class AlxPrintModule {
}
