import { Injectable, signal } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Note } from '../models/note';

const NOTES_KEY = 'notas';

@Injectable({
  providedIn: 'root',
})
export class NotesService {

  private _notas = signal<Note[]>([]);

  notas = this._notas.asReadonly();

  async load(): Promise<void> {
    const { value } = await Preferences.get({ key: NOTES_KEY })
    this._notas.set(value ? JSON.parse(value): []);
  }

  private async persist(): Promise<void> {
    await Preferences.set({
      key: NOTES_KEY,
      value: JSON.stringify(this._notas())
    })
  }

  async saveNote(title: string, content: string) {
    const nota = new Note(this.createUniqueId(), title, content)
    this._notas.update(n => [...n, nota])
    await this.persist();
    return nota;
  }

  async deleteNote(id: string) {
    this._notas.update(n => n.filter(x => x.id !== id));
    await this.persist();
  }

  async updateNote(id: string, title: string, content: string) {
    const nota = new Note(id, title, content);
    this._notas.update(n =>
      n.map(x => x.id === nota.id ? nota: x)
    );
    await this.persist();
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
