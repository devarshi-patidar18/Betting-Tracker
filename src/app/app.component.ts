import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatchCardComponent } from "./common/match-card/match-card.component";

interface Match {
  id: number;
  team1: string;
  team2: string;
  status: string;
  date: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatchCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  

  
}
