import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const newBoard: number[][] = JSON.parse(JSON.stringify(board));
  // for (let py = 0; py < 8; py++) {
  //   for (let px = 0; px < 8; px++) {
  //     const color = board[py][px];
  //     console.log(px, py, color);
  //     if (color === 3) {
  //       newBoard[py][px] = 0;
  //     }
  //     if (
  //       board[py + 1] !== undefined &&
  //       board[py + 1][px] === 3 - turnColor &&
  //       board[py + 2][px] === turnColor &&
  //       board[py][px - 1] === 0
  //     ) {
  //       newBoard[py][px - 1] = 3;
  //     }
  //     if (
  //       board[px - 2] !== undefined &&
  //       board[py][px - 2] === 3 - turnColor &&
  //       board[py][px - 1] === turnColor &&
  //       board[py][px] === 0
  //     ) {
  //       newBoard[py][px] = 3;
  //     }
  //     if (
  //       py + 1 >= 0 &&
  //       py + 1 < board.length &&
  //       px - 1 >= 0 &&
  //       px - 1 < board[0].length &&
  //       board[py + 1][px - 1] !== undefined &&
  //       board[py + 1][px - 1] === 3 - turnColor &&
  //       board[py + 2][px - 2] === turnColor &&
  //       board[py][px] === 0
  //     ) {
  //       newBoard[py][px] = 3;
  //     }
  //   }
  // }
  const onClick = (x: number, y: number) => {
    const directions = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
      [1, -1],
      [1, 1],
      [-1, -1],
      [-1, 1],
    ];
    const changeBoard =(x:number, y:number, orange:boolean, turnColor:number)=>{
    for (let m = 0; m < 8; m++) {
      const dx = directions[m][0];
      const dy = directions[m][1];
      if (
        board[y + dy] !== undefined &&
        board[x + dx] !== undefined &&
        board[y + dy][x + dx] === 3 - turnColor
      ) {
        for (let i = 2; i < 8; i++) {
          if (
            board[y + i * dy] !== undefined &&
            board[x + i * dx] !== undefined &&
            board[y + i * dy][x + i * dx] === turnColor
          ) {
            for (let n = 0; n < i; n++) {
              newBoard[y + n * dy][x + n * dx] = turnColor;
            }
            setTurnColor(3 - turnColor);
            
            break;
          }
        }
      }
    }
  }

    setBoard(newBoard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#0007' : color === 3 ? '#FFFF00' : '#fff' }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
