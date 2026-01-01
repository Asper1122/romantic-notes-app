import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Home } from './pages/home/home';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageContent } from './components/message-content/message-content';
import { NotasList } from './components/notas-list/notas-list';
import { NotaDetail } from './pages/nota-detail/nota-detail';

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
    NgbModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch())
  ],
  bootstrap: [App]
})
export class AppModule { }
