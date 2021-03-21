import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss']
})
export class NoteDialogComponent implements OnInit {
  note = '';
  constructor(public dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}
  ngOnInit(): void {
    this.note = this.data.note;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveAndClose(){
    this.dialogRef.close(this.note);
  }
}
