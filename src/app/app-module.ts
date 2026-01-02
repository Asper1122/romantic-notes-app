import { APP_INITIALIZER, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { Capacitor } from '@capacitor/core';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Home } from './pages/home/home';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageContent } from './components/message-content/message-content';
import { NotasList } from './components/notas-list/notas-list';
import { NotaDetail } from './pages/nota-detail/nota-detail';
import { FormsModule } from '@angular/forms';
import { NotesService } from './services/notes-service';

export function loadNotesFactory(notesService: NotesService) {
  return async () => {
    if(Capacitor.getPlatform() !== 'web' || typeof window !== 'undefined') {
      await notesService.load();
    }
  };
}


@NgModule({
  declarations: [
    App,
    Home,
    MessageContent,
    NotasList,
    NotaDetail
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    NotesService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadNotesFactory,
      deps: [NotesService],
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
