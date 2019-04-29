import { Component} from '@angular/core';
import { boardSize, colors, controls } from './welcome.constants';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],  
// tslint:disable-next-line: use-host-property-decorator
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class WelcomeComponent {
  direction: number;
  gameOver = false;
  board = [];
  constructor() {
    this.setBoard();
  }
  setColors(col: number, row: number): string {
    return colors.board;
  }

  handleKeyboardEvents(e: KeyboardEvent) {
    if (e.keyCode === controls.left ) {
      this.direction = controls.left;
    } else if (e.keyCode === controls.up) {
      this.direction = controls.up;
    } else if (e.keyCode === controls.right ) {
      this.direction = controls.right;
    } else if (e.keyCode === controls.down ) {
      this.direction = controls.down;
    }
  }
  setBoard(): void {
    this.board = [];

    for (let i = 0; i < boardSize; i++) {
      this.board[i] = [];
      for (let j = 0; j < boardSize; j++) {
        this.board[i][j] = false;
      }
    }
  }
}
