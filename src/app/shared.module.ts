// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxLoaderComponent } from './ajax-loader/ajax-loader.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    declarations: [
     AjaxLoaderComponent
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatSidenavModule,
        MatListModule,
        OverlayModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    exports: [
        AjaxLoaderComponent,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatSidenavModule,
        MatListModule,
        OverlayModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule
    ]
})
export class SharedModule { }