import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(public afDB: AngularFireDatabase) { 

  }

  public getNotes(){
    return this.afDB.list('notes').snapshotChanges().pipe(
      map(items => {
        return items.map(a => {
          const data = a.payload.val();
          const key = a.payload.key;
          return { key, data };
        })
      })
    );
  }

  public getNote(id){
    return this.afDB.object('notes/' + id);
  }

  public createNote(note){
    const itemsRef = this.afDB.list('notes');
    return itemsRef.push(note);            
  }

  public editNote(key, note){
    const itemsRef = this.afDB.list('notes');    
    return itemsRef.update(key, { title: note.title, body: note.body, category: note.category });
  }

  public deleteNote(key){
    const itemsRef = this.afDB.list('notes');
    return itemsRef.remove(key);
  }
}
