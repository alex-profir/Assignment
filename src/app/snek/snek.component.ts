import { Component } from '@angular/core';
import { boardSize, colors, controls } from './snek.constants';
import { Vei2 } from './vei2';

@Component({
  selector: 'app-snek',
  templateUrl: './snek.component.html',
  styleUrls: ['./snek.component.css'],
  // tslint:disable-next-line: use-host-property-decorator
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class SnekComponent {
  private interval: number;
  direction: number;
  gameOver = false;
  isGoing = false;
  board = [];
  private snake = {
    direction: controls.left,
    parts: [
      {
        x: -1,
        y: -1
      }
    ]
  };
  private fruit: Vei2 = {
    x: -1,
    y: -1
  };
  constructor() {
    this.setBoard();
  }
  setColors(col: number, row: number): string {
    if (this.fruit.x === row && this.fruit.y === col) {
      return colors.fruit;
    } else if (this.snake.parts[0].x === row && this.snake.parts[0].y === col) {
      return colors.head;
    } else if (this.board[col][row] === true) {
      return colors.body;
    }
    return colors.board;
  }

  handleKeyboardEvents(e: KeyboardEvent) {
    if (e.keyCode === controls.left && this.direction !== controls.right) {
      this.direction = controls.left;
    } else if (e.keyCode === controls.up && this.direction !== controls.down) {
      this.direction = controls.up;
    } else if (e.keyCode === controls.right && this.direction !== controls.left) {
      this.direction = controls.right;
    } else if (e.keyCode === controls.down && this.direction !== controls.up) {
      this.direction = controls.down;
    }
  }

  setBoard() {
    this.board = [];

    for (let i = 0; i < boardSize; i++) {
      this.board[i] = [];
      for (let j = 0; j < boardSize; j++) {
        this.board[i][j] = false;
      }
    }
  }
  eatFruit() {
    const tail = Object.assign({}, this.snake.parts[this.snake.parts.length - 1]);
    this.snake.parts.push(tail);
    this.resetFruit();
  }

  fruitCollision(part: Vei2): boolean {
    return part.x === this.fruit.x && part.y === this.fruit.y;
  }

  selfCollision(part: Vei2): boolean {
    return this.board[part.y][part.x] === true;
  }

  boardCollision(part: Vei2): boolean {
    return part.x === boardSize || part.x === -1 || part.y === boardSize || part.y === -1;
  }
  resetFruit() {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);

    if (this.board[y][x] === true) {
      return this.resetFruit();
    }

    this.fruit = {
      x: x,
      y: y
    };
  }

  repositionHead(): Vei2 {
    const newHead = Object.assign({}, this.snake.parts[0]);
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

  updatePositions() {
    const newHead = this.repositionHead();
    if (this.boardCollision(newHead)) {
      return this.endGame();
    }

    if (this.selfCollision(newHead)) {
      return this.endGame();
    } else if (this.fruitCollision(newHead)) {
      this.eatFruit();
    }
    const oldTail = this.snake.parts.pop();
    this.board[oldTail.y][oldTail.x] = false;

    this.snake.parts.unshift(newHead);
    this.board[newHead.y][newHead.x] = true;

    this.snake.direction = this.direction;

    setTimeout(() => {
      this.updatePositions();
    }, this.interval);
  }

  newGame() {
    this.setBoard();
    this.direction = controls.left;
    this.interval = 150;
    this.gameOver = false;
    this.isGoing = true;
    this.snake = {
      direction: controls.left,
      parts: []
    };

    for (let i = 0; i < 3; i++) {
      this.snake.parts.push({ x: 14 + i, y: 14 });
    }
    this.resetFruit();
    this.updatePositions();
  }

  endGame() {
    setTimeout(() => {
      this.gameOver = true;
      this.isGoing = false;
    }, 500);
  }


}
