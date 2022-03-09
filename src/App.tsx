import React, { useEffect, useCallback, useState, useRef } from "react";
import FallingLetterBox from "./comopnents/FallingLetterBox/FallingLetterBox";
import GameOverModal from "./comopnents/GameOverModal/GameOverModal";
import GameField from "./comopnents/GameField/GameField";
import ScoreContainer from "./comopnents/ScoreContainer/ScoreContainer";
import { v4 as uuid } from "uuid";
import randomInteger from "random-int";
import { AllowedLetters, TrapSize, GameOverAfterNinTrap } from "./Config";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "./store/game/actions";
import "./App.scss";

type AllowedLettersType = typeof AllowedLetters[number];

export interface Letters {
  [key: string]: {
    component: JSX.Element;
    trap: boolean;
    letter: string;
  };
}

function GetRandomLetter(): AllowedLettersType {
  return AllowedLetters[Math.floor(Math.random() * AllowedLetters.length)];
}

function App(props: { setDuration: any; pause: boolean; duration: number }) {
  const { pause, duration, setDuration } = props;
  const [letters, setLetters] = useState<Letters>({});
  const [lettersEmmited, setLettersEmitted] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [totalInTrapArray, setTotalInTrapArray] = useState<Array<string>>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const pauseRef = useRef(pause);
  const gameOverRef = useRef(gameOver);
  const lettersRef = useRef(letters);
  const durationRef = useRef(duration);
  const handleUserKeyPress = useCallback(
    (event) => {
      function removeLettersOutsideTrap(letter: string) {
        setLetters((newLetters) => {
          let newScore = 0;
          let toDelete: Array<string> = [];

          Object.keys(letters).forEach(function (key, index) {
            if (
              letters[key].trap === false &&
              letters[key].letter.toUpperCase() === letter.toUpperCase()
            ) {
              newScore++;
              toDelete.push(key);
            }
          });

          if (newScore > 1) {
            // delete letters
            toDelete.forEach((item) => {
              delete newLetters[item];
            });

            setScore((prevScore) => {
              return newScore + prevScore;
            });
          }

          return newLetters;
        });
      }
      const { key } = event;
      if (!gameOver && !pause) {
        removeLettersOutsideTrap(key);
      }
    },
    [gameOver, pause, letters]
  );

  pauseRef.current = pause;
  durationRef.current = duration;
  gameOverRef.current = gameOver;
  lettersRef.current = letters;

  // increasing falling speed in time, also used in emition
  useEffect(() => {
    setTimeout(() => {
      const duration =
        durationRef.current > 100 ? durationRef.current - 25 : 100;
      setDuration(duration);
    }, 1000);
  }, [duration, setDuration]);

  function setInTrapInLettersObject(uuid: string) {
    setLetters((newLetters) => {
      if (newLetters[uuid] !== undefined) {
        newLetters[uuid].trap = true;
      }
      setTotalInTrapArray((totalInTrapArray: Array<string>) => {
        if (totalInTrapArray.indexOf(uuid) === -1) {
          totalInTrapArray.push(uuid);
        }
        return [...totalInTrapArray];
      });
      return newLetters;
    });
  }

  // EMITTING LETTERS
  useEffect(() => {
    function emitLetter() {
      const key = uuid();
      const letter = GetRandomLetter();
      let newLetters = lettersRef.current;
      newLetters[key] = {
        component: (
          <FallingLetterBox
            trapSize={TrapSize}
            key={key}
            uuid={key}
            letter={letter}
            inTrapCb={setInTrapInLettersObject}
          />
        ),
        trap: false,
        letter: letter,
      };
      setLetters({ ...newLetters });
      setLettersEmitted((prevLettersEmitted) => prevLettersEmitted + 1);
    }
    const timeout = setTimeout(() => {
      if (!gameOverRef.current && !pauseRef.current) {
        emitLetter();
      }
      return () => {
        clearTimeout(timeout);
      };
    }, randomInteger(100, durationRef.current / 2));
  }, [lettersEmmited, gameOver, pause]);

  // GAME OVER
  useEffect(() => {
    if (totalInTrapArray.length >= GameOverAfterNinTrap) {
      setGameOver(true);
    }
  }, [totalInTrapArray.length]);

  // KEYBOARD LISTENER
  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <div className="mainContainer">
      <GameOverModal score={score} show={gameOver} />
      <GameField letters={letters} />
      <ScoreContainer score={score} />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    pause: state.game.pause,
    duration: state.game.duration,
  };
};

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      setDuration: Actions.setDuration,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
