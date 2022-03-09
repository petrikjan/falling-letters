import "./GameField.scss";
import { TrapSize } from "../../Config";
import { Letters } from "../../App";

type GameFieldProps = {
  letters: Letters;
};

function GameField(props: GameFieldProps) {
  const { letters } = props;
  return (
    <div className="gameField">
      {Object.keys(letters).map<JSX.Element>((key) => {
        return letters[key].component;
      })}
      <div
        className="trapLine"
        style={{
          bottom: TrapSize + "vh",
        }}
      />
    </div>
  );
}

export default GameField;
