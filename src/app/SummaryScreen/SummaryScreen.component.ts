import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summaryscreen.component.html',
  styleUrls: ['./summaryscreen.component.css']
})
export class SummaryComponent implements OnInit {
  wordsSummary: { hebrewWord: string, englishWord: string, isCorrect: boolean }[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['summary']) {
      this.wordsSummary = navigation.extras.state['summary'];
    }
  }
}
