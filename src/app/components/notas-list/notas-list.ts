import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  notas: Note[] = [];

  ngOnInit(): void {
    document.addEventListener("DOMContentLoaded", () => {
      this.cargarNotas();
    })
  }

  private cargarNotas() {
    this.notasService.getNotes()
    .then(notas => {
      this.notas = notas;
      this.cd.detectChanges();
      console.log(notas)
    });
  }

  cargarDetalleNota() {

  }

  async crearNota() {
    const nota = await this.notasService.saveNote("", "");
    this.router.navigateByUrl("/nota/" + nota.getId);
  }
}
