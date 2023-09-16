import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  template: `
    <h2 mat-dialog-title>{{data.title}}</h2>
    <mat-dialog-content>
      {{data.content}}
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Igen</button>
      <button mat-button [mat-dialog-close]="false">Nem</button>
    </mat-dialog-actions>
  `,
})
export class deleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<deleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; content: string }
  ) {}
}
