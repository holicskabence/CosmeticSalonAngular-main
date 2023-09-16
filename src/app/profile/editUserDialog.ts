import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  template: `
    <h2 mat-dialog-title>Adatok szerkesztése</h2>
    <mat-dialog-content class="dialog-content">
    <mat-form-field appearance="outline">
                <mat-label>Családnév</mat-label>
                <input 
                    matInput
                    [(ngModel)]="data.firstName">
            </mat-form-field>
            <mat-form-field appearance="outline">
                <mat-label>Utónév</mat-label>
                <input 
                    matInput
                    [(ngModel)]="data.lastName">
            </mat-form-field>
            <mat-form-field appearance="outline">
                <mat-label>Mobilszám</mat-label>
                <input 
                    matInput
                    type="number"
                    [(ngModel)]="data.mobil">
            </mat-form-field>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>OK</button>
      <button mat-button mat-dialog-close>Cancel</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
    mat-dialog-content{
      padding-top:10px !important;

    }
      .dialog-content {
        display: flex;
        flex-direction: column;
      }

      .form-field {
        width: 100%;
        margin-bottom: 16px;
      }
    `,
  ],
})
export class EditUserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      firstName: string;
      lastName: string;
      email: string;
      mobil: string;
    }
  ) {}
}
