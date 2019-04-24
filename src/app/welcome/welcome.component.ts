import { Component} from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent{


  private board_size = 25;
  public board = [];
  constructor() {
    this.setBoard();
  }
  setColors(col: number, row: number): string {
    return '#000000';
  }
  setBoard(): void {
    this.board = [];

    for (let i = 0; i < this.board_size; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.board_size; j++) {
        this.board[i][j] = 123; // we will use this later 
      }
    }
  }
}
