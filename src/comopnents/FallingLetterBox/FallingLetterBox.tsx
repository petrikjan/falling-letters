import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import "./FallingLetterBox.scss";
import invertColor from "invert-color";
import randomInteger from "random-int";
import { MinSize } from "../../Config";
import { connect } from "react-redux";
var randomColor = require("randomcolor");

type FallintLetterProps = {
  trapSize: number;
  key: string;
  uuid: string;
  letter: string;
  pause: boolean;
  duration: number;
  inTrapCb: (uuid: string) => void;
};

function FallingLetterBox(props: FallintLetterProps) {
  const { trapSize, letter, inTrapCb, uuid, pause, duration } = props;
  const [inTrap, setInTrap] = useState(false);
  const [divHeight] = useState(randomInteger(MinSize, trapSize));
  const [left] = useState(randomInteger(0, 100));
  const [bottom] = useState(
    (100 - trapSize) * 0.5 + trapSize + randomInteger(0, 50)
  );
  const [fontSize] = useState(randomInteger(MinSize, divHeight) / 1.2);
  const [backgroundColor] = useState(randomColor());
  const [color] = useState(invertColor(backgroundColor));
  const [style, api] = useSpring(() => ({
    from: {
      bottom: bottom + "vh",
    },
    to: { bottom: "0vh" },

    config: {
      duration: duration,
    },

    onChange: (params) => {
      if (parseFloat(params.value.bottom) < trapSize && !inTrap) {
        setInTrap(true);
        inTrapCb(uuid);
      }
    },
  }));

  useEffect(() => {
    if (pause) {
      api.pause();
    } else {
      api.resume();
    }
  }, [pause, api]);

  return (
    <animated.div
      style={{
        height: divHeight + "vh",
        fontSize: fontSize + "vh",
        left: "min(calc(100% - " + divHeight + "vh), " + left + "%)",
        backgroundColor,
        color,
        ...style,
      }}
      className="letterBox"
    >
      {letter}
    </animated.div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    pause: state.game.pause,
    duration: state.game.duration,
  };
};

export default connect(mapStateToProps)(FallingLetterBox);
