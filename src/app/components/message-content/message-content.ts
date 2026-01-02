import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages-service';

@Component({
  selector: 'app-message-content',
  standalone: false,
  templateUrl: './message-content.html',
  styleUrl: './message-content.css',
})
export class MessageContent implements OnInit{

  constructor(private mensajeService: MessagesService
  ) {}

  mensaje: string | null = null;

  ngOnInit(): void {
    this.loadMessage();
  }

  private loadMessage() {
    const mensajeGuardado = localStorage.getItem("mensajeDia");

    if(mensajeGuardado && this.isIdValid()) {
      this.mensaje = mensajeGuardado;
    }

    else {
      this.mensajeService.getMessages().subscribe({
        next: messages => {
          if(messages.length === 0) return;

          const today = new Date().getDate();
          const index = messages.findIndex(message => message.id === today);

          if(index === -1) return;

          this.mensaje = messages[index].text;
          localStorage.setItem("mensajeDia", this.mensaje);
          localStorage.setItem("idMensaje", messages[index].id.toString())
        },
        error: err => console.error("Error cargando mensajes", err)
      });
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
