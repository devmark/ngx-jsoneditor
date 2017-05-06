import {
    Component, Input, Output, ViewChild, EventEmitter, NgZone, forwardRef, AfterViewInit,
    OnDestroy
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {JSONEditorOptions, JSONEditorMode} from 'jsoneditor';
import * as _ from 'lodash';

declare var JSONEditor:any;

/**
 * JSONEditor component
 * Usage :
 *  <json-editor [(ngModel)]="data" [config]="{...}"></json-editor>
 */
@Component({
    selector: 'json-editor',
    exportAs: 'json-modal',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => JSONEditorComponent),
            multi: true
        }
    ],
    template: `
        <div #host></div>`,
})

export class JSONEditorComponent implements AfterViewInit, OnDestroy {

    @Input() public config: JSONEditorOptions;
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() editable: EventEmitter<any> = new EventEmitter();
    @Output() error: EventEmitter<any> = new EventEmitter();
    @ViewChild('host') host: any;

    private _value: Object;
    public instance: any;
    public zone: NgZone;

    /**
     * Constructor
     */
    constructor(zone: NgZone) {
        this.zone = zone;
    }

    /**
     * On component destroy
     */
    ngOnDestroy() {
        this.destroy();
    }

    /**
     * On component view init
     */
    ngAfterViewInit() {
        this.editorInit(this.config || {});
    }

    /**
     * Editor init
     */
    editorInit(config: any = {}) {
        const self = this;
        let defaultConfig: any = {
            onChange: function () {
                const value = self.instance.get();
                self.updateValue(value);
            },
        };

        if (self.editable.observers.length > 0) {
            defaultConfig.onEditable = function (v) {
                self.editable.emit(v);
            };
        }

        if (self.error.observers.length > 0) {
            defaultConfig.onError = function (v) {
                self.error.emit(v);
            };
        }
        const newConfig = _.extend(config, defaultConfig);
        this.instance = new JSONEditor(this.host.nativeElement, newConfig);
    }

    get value(): Object {
        return this._value;
    };

    set value(v: Object) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    /**
     * Value update process
     */
    updateValue(value: any) {
        this.zone.run(() => {
            this.value = value;

            this.onChange(value);

            this.onTouched();
            this.change.emit(value);
        });
    }

    /**
     * Implements ControlValueAccessor
     */
    writeValue(value: any) {
        this._value = value;
        if (this.instance) {
            this.instance.set(value);
        }
    }

    onChange(_: any) {
    }

    onTouched() {
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }


    /**
     * Json editor method
     *
     */
    public expandAll(): void {
        if (this.instance) {
            this.instance.expandAll();
        }
    }

    public collapseAll(): void {
        if (this.instance) {
            this.instance.collapseAll();
        }
    }

    public destroy(): void {
        if (this.instance) {
            this.instance.destroy();
        }
    }

    public focus(): void {
        if (this.instance) {
            this.instance.focus();
        }
    }

    public setMode(mode: JSONEditorMode): void {
        if (this.instance) {
            this.instance.setMode(mode);
        }
    }

    public setName(name: string | undefined): void {
        if (this.instance) {
            this.instance.setName(name);
        }
    }

    public setSchema(schema: Object): void {
        if (this.instance) {
            this.instance.setSchema(schema);
        }
    }

    public setText(jsonString: string) {
        if (this.instance) {
            this.instance.setText(jsonString);
        }
    }

    public getMode(): JSONEditorMode {
        if (this.instance) {
            return this.instance.getMode();
        }
    }

    public getName(): string {
        if (this.instance) {
            return this.instance.getName();
        }
    }

    public getText(): string {
        if (this.instance) {
            return this.instance.getText();
        }
    }

}
