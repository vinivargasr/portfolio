import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./components/home/home";
import { Contact } from "./components/contact/contact";
import { Projects } from './components/projects/projects';

@Component({
  selector: 'app-root',
  imports: [Home, Contact, Projects],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'porfolio';
}
