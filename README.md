

# @Al00X/Printer
> 🖨️ _Quickly print anything, anywhere, anytime!_ with Angular.


## ✅ Setup:
Install using your prefered package manager:

    npm i @al00x/printer
Add the line below to your global styles inside the `angular.json`:
	
```json
"styles": [  
	  ...
	  "./node_modules/@al00x/printer/styles.css"
	],
```

## ✨ Usage:
You can simply throw `alxPrinter` directive on any html block and print!

```html
<div alxPrint #printer="alxPrint">
...
</div>

<button (click)="printer.print()">Print</button>
```
You can also pass a HTMLElement to `print()` manually.

### ⚙️ Directive Inputs:
| property                 | usage | default |
|--------------------------|--|-------|
| `hidden: boolean`        | When set to true, the element itself gets hidden but visible to the print | false |
| `printFn: void function` | If you need a different printing function, provide its function here. | () => window.print() |


