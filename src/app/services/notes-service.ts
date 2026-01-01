import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Note } from '../models/note';

const NOTES_KEY = 'notas';

@Injectable({
  providedIn: 'root',
})
export class NotesService {

  async getNotes(): Promise<Note[]> {
    const { value } = await Preferences.get({ key: NOTES_KEY });
    return value ? JSON.parse(value) : [];
  }

  async saveNote(title: string, content: string) {
    const note = new Note(this.createUniqueId(), title, content);
    const notes = await this.getNotes();
    notes.push(note);
    await this.saveAll(notes);
    return note;
  }

  async deleteNote(id: string) {
    const notes = await this.getNotes();
    const filtered = notes.filter(note => note.getId !== id);
    await this.saveAll(filtered);
  }

  async updateNote(id: string, title: string, content: string) {
    const notes = await this.getNotes();
    const index = notes.findIndex(note => note.getId === id);

    if(index === -1) return;

    notes[index] = new Note(id, title, content)

    await this.saveAll(notes);
  }

  private async saveAll(notes: Note[]) {
    await Preferences.set({
      key: NOTES_KEY,
      value: JSON.stringify(notes)
    });
  }

  private createUniqueId() {
    const dateStr = Date.now()
    .toString(36);

    const randomStr = Math.random()
    .toString(36)
    .substring(2, 8);

    return `${dateStr}-${randomStr}`;
  }

}
