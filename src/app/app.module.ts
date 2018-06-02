import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SpeechService } from '../app/speech.service';
import { LocationformComponent } from './locationform/locationform.component';
import { LocationlistComponent } from './locationlist/locationlist.component';
import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    LocationformComponent,
    LocationlistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [SpeechService],
  bootstrap: [AppComponent]
})
export class AppModule { }
