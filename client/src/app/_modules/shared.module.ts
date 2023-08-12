import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadModule } from 'ng2-file-upload';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    MatDialogModule,
    FileUploadModule,
    ReactiveFormsModule
  ],
  exports:[
    ToastrModule,
    MatDialogModule,
    FileUploadModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
