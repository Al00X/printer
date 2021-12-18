import { Directive, NgModule } from '@angular/core';

const CLASS_NAME = 'alx-printable'

@Directive({
  selector: '[alxPrint]',
  exportAs: 'alxPrint'
})
export class AlxPrintDirective {
  print(elementToPrint: HTMLElement) {
    const printContent = elementToPrint.innerHTML;
    const printableDiv = document.createElement('div');
    printableDiv.className = elementToPrint.className;
    printableDiv.classList.add(CLASS_NAME);
    printableDiv.innerHTML = printContent;
    document.body.appendChild(printableDiv);
    window.print();
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
