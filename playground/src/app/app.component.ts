import {Component, ViewChild} from '@angular/core';
import {AlxPrintDirective} from "al00x/printer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('printer2') printer2!: AlxPrintDirective;

  title = 'playground';

  customPrintFn = () => {
    console.log('Print?');
    setTimeout(() => {
      this.printer2.cleanup();
    }, 1000)
  };
}
