import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages-service';

@Component({
  selector: 'app-message-content',
  standalone: false,
  templateUrl: './message-content.html',
  styleUrl: './message-content.css',
})
export class MessageContent implements OnInit{

  constructor(private mensajeService: MessagesService,
    private cd: ChangeDetectorRef
  ) {}

  mensaje: string | null = null;

  ngOnInit(): void {
    document.addEventListener("DOMContentLoaded", () => {
      this.loadMessage();
    })
  }

  private loadMessage() {
    const mensajeGuardado = localStorage.getItem("mensajeDia");

    if(mensajeGuardado) {
      this.mensaje = mensajeGuardado;
      this.cd.detectChanges();
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
          this.cd.detectChanges();
        },
        error: err => console.error("Error cargando mensajes", err)
      });
    }
  }
}
