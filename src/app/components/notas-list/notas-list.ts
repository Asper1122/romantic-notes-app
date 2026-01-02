import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes-service';
import { Note } from '../../models/note';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notas-list',
  standalone: false,
  templateUrl: './notas-list.html',
  styleUrl: './notas-list.css',
})
export class NotasList implements OnInit{

  constructor(private notasService: NotesService,
    private router: Router
  ) { }

  notas: Note[] = [];

  ngOnInit(): void {
    this.cargarNotas();
  }

  private cargarNotas() {
    this.notas = this.notasService.notas();
  }

  cargarDetalleNota(id: string) {
    this.router.navigateByUrl("/nota/" + id);
  }

  async crearNota() {
    const nota = await this.notasService.saveNote("", "");
    this.router.navigateByUrl("/nota/" + nota.id);
  }
}
