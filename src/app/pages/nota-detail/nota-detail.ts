import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../../services/notes-service';

@Component({
  selector: 'app-nota-detail',
  standalone: false,
  templateUrl: './nota-detail.html',
  styleUrl: './nota-detail.css',
})
export class NotaDetail implements OnInit{

  titulo = "Título de Nota";

  contenido = "";

  id: string | null = null;

  constructor(private route: ActivatedRoute, private notaService: NotesService
  ) { }

  ngOnInit(): void {
    this.cargarNota();
  }

  private cargarNota() {
    this.id = this.route.snapshot.paramMap.get("id");

    if(this.id) {
      const index = this.notaService.notas().findIndex(note => note.id === this.id);
      const nota = this.notaService.notas()[index];
      this.titulo = nota.title;
      this.contenido = nota.content;

    }
  }

  guardarNota() {

    if(this.id){
    this.notaService.updateNote(this.id, this.titulo, this.contenido)
    .then(() => window.location.href = "/home")
    }
  }

  cancelar() {
    if(this.contenido.length == 0 && this.id) {
      this.borrarNota();
    }

    else {
      window.location.href = "/home";
    }
  }

  borrarNota() {
    if(this.id){
    this.notaService.deleteNote(this.id)
      .then(() => window.location.href = "/home");
    }
  }

}
