import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-profile-dialog',
  templateUrl: './delete-profile-dialog.component.html',
  styleUrls: ['./delete-profile-dialog.component.css']
})
export class DeleteProfileDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteProfileDialogComponent, boolean>) { }

  onConfirm(): void {
    this.dialogRef.close(true); // Return true when the user confirms
  }

  onCancel(): void {
    this.dialogRef.close(false); // Return false when the user cancels
  }

  // Handle the case when the user closes the dialog without clicking Confirm or Cancel.
  // Return false to consider the action as canceled.
  onClose(): void {
    this.dialogRef.close(false);
  }
}
