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
  private interval: number;
  direction: number;
  gameOver = false;
  board = [];
  snake = {
    direction: controls.left,
    parts: [
      {
        x: -1,
        y: -1
      }
    ]
  };
  constructor() {
    this.setBoard();
  }
  setColors(col: number, row: number): string {
    if (this.snake.parts[0].x === row && this.snake.parts[0].y === col) {
      return colors.head;
    } else if (this.board[col][row] === true) {
      return colors.body;
    }
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
  
  repositionHead(): any {
    let newHead = Object.assign({}, this.snake.parts[0]);

    if (this.direction === controls.left) {
      newHead.x -= 1;
    } else if (this.direction === controls.right) {
      newHead.x += 1;
    } else if (this.direction === controls.up) {
      newHead.y -= 1;
    } else if (this.direction === controls.down) {
      newHead.y += 1;
    }

    return newHead;
  }

  updatePositions(): void {
    let newHead = this.repositionHead();
    let me = this;


    let oldTail = this.snake.parts.pop();
    this.board[oldTail.y][oldTail.x] = false;

    this.snake.parts.unshift(newHead);
    this.board[newHead.y][newHead.x] = true;

    this.snake.direction = this.direction;

    setTimeout(() => {
      me.updatePositions();
    }, this.interval);
  }
  newGame(): void {
    this.direction = controls.left;
    this.interval = 150;
    this.snake = {
      direction: controls.left,
      parts: []
    };

    for (let i = 0; i < 3; i++) {
      this.snake.parts.push({ x: 8 + i, y: 8 });
    }
    this.updatePositions();
  }

}
