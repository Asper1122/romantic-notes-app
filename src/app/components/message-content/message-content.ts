import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-message-content',
  standalone: false,
  templateUrl: './message-content.html',
  styleUrl: './message-content.css',
})
export class MessageContent implements OnInit{

  constructor(private mensajeService: MessagesService,
    private cdr: ChangeDetectorRef
  ) {}

  mensaje: string | null = null;

  ngOnInit(): void {
    this.loadMessage();
  }

  private async loadMessage() {
    const mensajeGuardado = localStorage.getItem("mensajeDia");

    if(mensajeGuardado && this.isIdValid()) {
      this.mensaje = mensajeGuardado;
      return;
    }

    try {
      const messages = await firstValueFrom(
        this.mensajeService.getMessages()
      );

      if(!messages.length) return;

      const today = new Date().getDate();
      const index = messages.findIndex(m => m.id === today);

      if(index === -1) return;

      this.mensaje = messages[index].text;
      this.cdr.markForCheck();

      localStorage.setItem("mensajeDia", this.mensaje);
      localStorage.setItem("idMensaje", today.toString());
    } catch (err) {
      console.error("Error cargando mensaje", err);
    }
  }

  private isIdValid() {
    const idMensaje = localStorage.getItem("idMensaje");

    if(idMensaje) {
      return Number.parseInt(idMensaje) == new Date().getDate();
    }

    return false;
  }
}
