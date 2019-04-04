import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NotesService } from './services/notes.service';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pwa';
  panelOpenState: boolean = false;
  categorias: any = ['Trabajo', 'Personal'];
  note: any = {};
  notes: any = [];
  key: string = null;
  constructor(private swUpate: SwUpdate, private noteService: NotesService, private snackBar: MatSnackBar){
    noteService.getNotes().subscribe((fbNotes) => {
      this.notes = fbNotes;
      console.log(this.notes);
    });    
  };

  ngOnInit(): void{
    if(this.swUpate.isEnabled){
      this.swUpate.available.subscribe( next =>{
        window.location.reload();
      })
    }
  }

  selectNote(note){    
    this.note = note.data;
    this.key = note.key;
  }

  saveNote(){
    if(!this.note.id){
      this.note.id = Date.now();
    }
    if(this.key){
      this.noteService.editNote(this.key, this.note).then(() => {
        this.note = {};
        this.snackBar.open('Note updated :)', null, {
          duration: 2000,
        });
      })
    }else{
      this.noteService.createNote(this.note).then( () => {
        this.note = {};
        this.snackBar.open('Note saved :)', null, {
          duration: 2000,
        });
      }).catch(err => {
        console.log(err);
        this.snackBar.open('Opps, something has happened, note not saved :(', null, {
          duration: 2000,
        });
      });
    }

    
  }
}
