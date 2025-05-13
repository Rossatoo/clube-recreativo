import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { EspacosComponent } from './components/espacos/espacos.component';
import { EspacoDetalheComponent } from './components/espaco-detalhe/espaco-detalhe.component';
import { ReservaFormComponent } from './components/reserva-form/reserva-form.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MinhasReservasComponent } from './components/minhas-reservas/minhas-reservas.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { VersionSwitcherComponent } from './components/version-switcher/version-switcher.component';

import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { EspacoService } from './services/espaco.service';
import { ReservaService } from './services/reserva.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    EspacosComponent,
    EspacoDetalheComponent,  // Adicionado
    ReservaFormComponent,
    CalendarioComponent,     // Adicionado
    LoginComponent,
    DashboardComponent,      // Adicionado
    MinhasReservasComponent,
    SearchFormComponent,
    VersionSwitcherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'espacos', component: EspacosComponent },
      { path: 'espacos/:id', component: EspacoDetalheComponent },
      { path: 'reservar/:id', component: ReservaFormComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'minhas-reservas', component: MinhasReservasComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [
    AuthService,
    EspacoService,
    ReservaService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }