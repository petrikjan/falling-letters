import "./GameOverModal.scss";

type GameOverModalProps = {
  score: number;
  show: boolean;
};

function GameOverModal(props: GameOverModalProps) {
  const { score, show } = props;
  return (
    <div
      className="gameOverModalWrapper"
      style={show ? {} : { display: "none" }}
    >
      <div className="gameOverModal">
        <h1>Game Over</h1>
        <p>Score: {score}</p>
      </div>
    </div>
  );
}

export default GameOverModal;
