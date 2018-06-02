import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationformComponent } from './locationform/locationform.component';
import { LocationlistComponent } from './locationlist/locationlist.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', component: LocationformComponent },
    { path: 'locationlist', component: LocationlistComponent }
  ];

  // Deprecated provide
  // export const APP_ROUTER_PROVIDERS = [
  //   provideRouter(routes)
  // ];

  export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
