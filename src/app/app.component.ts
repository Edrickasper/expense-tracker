import { Component, inject, Input } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  authService = inject(AuthenticationService)
  title = 'transaction-manager';
  @Input() isLoggedin = false
}
