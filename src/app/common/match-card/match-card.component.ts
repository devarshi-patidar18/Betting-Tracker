import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Bet {
  team: 'W1' | 'W2';
  amount: number;
  expectedReturn: number;
}

@Component({
  selector: 'app-match-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './match-card.component.html',
  styleUrl: './match-card.component.css'
})
export class MatchCardComponent {

  team1: string = '';
  team2: string = '';
  addMatchScreen: boolean = false;
  teamSelected:number = 0;

  clickedAccordion: number = 0;
  matches: any = [];
  match: any = {};


  ngOnInit() {
    this.loadMatches();
  }

  saveMatch() {
    if (typeof localStorage !== 'undefined') {

      this.match.id  = null;
      this.match.id = this.matches.length + 1;
      this.match.totalInvested = 0;
      this.match.totalWinTeam1 = 0;
      this.match.totalWinTeam2 = 0;
      this.matches.push(this.match);
      localStorage.setItem('matches', JSON.stringify(this.matches));
      this.loadMatches();
      this.addMatchScreen = false;
    }
    console.log(this.matches)
  }

  addMatch() {
    this.addMatchScreen = true;
  }

  loadMatches() {
    if (typeof localStorage !== 'undefined') {
      const matches = localStorage.getItem('matches');
      if (matches) {
        this.matches = JSON.parse(matches);
      }
     
    }
  }

  toggleAccordion(i: number) {
    if (this.clickedAccordion === i) {
      this.clickedAccordion = -1; // Collapse if the same accordion is clicked
    }
    else {
      this.clickedAccordion = i;
    }
  }

  removeMatch(i: number) {
    if (confirm("Are you sure you want to delete this match?")) {

      this.matches.splice(i, 1);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('matches', JSON.stringify(this.matches));
      }
      this.loadMatches();
    }
  }

  saveBet(id: number, obj: any) {
    console.log(id)
    if (id !== null) {
      const tempMatch = this.matches.find((m: any) => m.id === id);
      this.matches.bets = [];
      this.matches.bets.push({
        
      });
      tempMatch.totalInvested = tempMatch.totalInvested + obj?.invested || 0;
      tempMatch.totalWinTeam1 = (this.teamSelected === 1 ? tempMatch.totalWinTeam1 + obj?.winTeam1 || 0 : tempMatch.totalWinTeam1) ;
      tempMatch.totalWinTeam2 = (this.teamSelected === 2 ? tempMatch.totalWinTeam2 + obj?.winTeam2 || 0 : tempMatch.totalWinTeam2);
    
      console.log(tempMatch);
      
      const matchIndex = this.matches.findIndex((m: any) => m.id === id);
      this.matches[matchIndex] = tempMatch;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('matches', JSON.stringify(this.matches));
        this.loadMatches(); 
        console.log("saved")
        console.log(this.matches);
      }

    }
    
    // this.addMatchScreen = false;
    this.teamSelected = 0;
  }

  selectTeam(n:number) {
    console.log(n)
    this.match = {};
    // this.match.winTeam1 = 0;
    // this.match.winTeam2 = 0;
    this.teamSelected = n;
  }
}
