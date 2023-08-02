import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteProfileDialogComponent } from '../dialog/delete-profile-dialog/delete-profile-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {


    constructor(private dialog: MatDialog) { }

    openConfirmationDialog(): MatDialogRef<DeleteProfileDialogComponent, boolean> {
        return this.dialog.open(DeleteProfileDialogComponent, {
          width: '300px'
        });
      }
  }