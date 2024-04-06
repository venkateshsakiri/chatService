// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxLoaderComponent } from './ajax-loader/ajax-loader.component';

@NgModule({
    declarations: [
     AjaxLoaderComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AjaxLoaderComponent
    ]
})
export class SharedModule { }