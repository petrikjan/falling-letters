import "./ScoreContainer.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/game/actions";

type ScoreContainerProps = {
  score: number;
  pause: boolean;
  setPause: any;
};

function ScoreContainer(props: ScoreContainerProps) {
  const { score, pause, setPause } = props;

  return (
    <div className="scoreContainer">
      <h1>Score</h1>
      <p>{score}</p>
      <button
        onClick={() => {
          setPause(!pause);
        }}
      >
        {pause ? "PLAY" : "PAUSE"}
      </button>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    pause: state.game.pause,
  };
};

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      setPause: Actions.setPause,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreContainer);
