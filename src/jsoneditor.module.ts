import {NgModule, ModuleWithProviders} from '@angular/core';
import {JSONEditorComponent} from './jsoneditor.component';

/**
 * JSONEditorModule
 */
@NgModule({
    imports: [
    ],
    declarations: [
        JSONEditorComponent,
    ],
    exports: [
        JSONEditorComponent,
    ]
})
export class JSONEditorModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: JSONEditorModule,
        };
    }
}

