# ngx-jsoneditor

## Installation

- Include JSONEditor css/js in your application :
```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/5.6.0/jsoneditor.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/5.6.0/jsoneditor.min.js"></script>
```

To install this library, run:

```bash
$ npm install ngx-jsoneditor --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ngx-jsoneditor
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { JSONEditorModule } from 'ngx-jsoneditor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Specify your library as an import
    JSONEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'sample',
  template: `
  <json-editor
    [(ngModel)]="jsonContent"
    jsonModal #staticModal="json-modal"
    [config]="{sortObjectKeys: true}"
    (change)="onChange($event)">
  </json-editor>

    <button (click)="staticModal.collapseAll()">collapseAll</button>
    <button (click)="staticModal.expandAll()">expandAll</button>
  `
})
export class Sample{
  constructor(){
    this.jsonContent = {
        "Array": [1, 2, 3],
        "Boolean": true,
        "Null": null,
        "Number": 123,
        "Object": {"a": "b", "c": "d"},
        "String": "Hello World"
    };
  }
  onChange(value){
      
  }
}
```

## Configuration
* `config` : The configuration object for JSONEditor see https://github.com/josdejong/jsoneditor/blob/master/docs/api.md#configuration-options

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [DevMark](mailto:hc.devmark@gmail.com)
