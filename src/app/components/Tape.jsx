import { useEffect, useRef, useState } from "react";
import Control from "./Control";

const Tape = (props) => {
  const [tape, setTape] = useState([]);
  const [loadWord, setLoadWord] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [currentState, setCurrentState] = useState(false);
  const intervalRef = useRef(null);
  const [dummy, setDummy] = useState(null);

  const [translate, setTranslate] = useState(0);

  const info = useRef({
    duration: 650,
    current: 2500,
    translateX: 0,
  });

  const updateInfo = (fieldName, value) => {
    return new Promise((resolve) => {
      info.current = {
        ...info.current,
        [fieldName]: value,
      };
      resolve();
    });
  };

  useEffect(() => {
    let elements = [];
    for (let i = 0; i < 5001; i++) {
      elements.push("");
    }

    setTape(elements);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setCurrentState(props.currentMachine.initialState);
  }, [props.currentMachine]);

  useEffect(() => {
    controlMachine("stop");

    let elements = [];
    for (let i = 0; i < 5001; i++) {
      elements.push("");
    }

    for (let i = 0; i < loadWord.length; i++) {
      elements[2500 + i] = loadWord[i] === "_" ? "" : loadWord[i];
    }

    setTape(elements);
  }, [loadWord]);

  useEffect(() => {
    updateInfo();
  }, [dummy]);

  const updateLoadWord = (value) => {
    setLoadWord(value);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const setValueInTape = (newValue, index) => {
    if (newValue === null) return;

    let actualTape = tape.slice();
    tape[index] = newValue;
    setTape(actualTape);
  };

  const move = async (newValue, direction) => {
    setValueInTape(newValue, info.current.current);

    setTimeout(() => {
      if (direction === ">") {
        updateInfo("current", info.current.current + 1);
        updateInfo("translateX", info.current.translateX - 61);
      } else if (direction === "<") {
        updateInfo("current", info.current.current - 1);
        updateInfo("translateX", info.current.translateX + 61);
      }

      // Debugging: Sprawdzenie wartości nowej komórki
      console.log(newValue);
    }, 0);
  };

  const runMachine = async () => {
    let actualState = currentState;
    let actualSymbol = tape[info.current.current];

    if (
      props.currentMachine.transitions[actualState] &&
      props.currentMachine.transitions[actualState][actualSymbol]
    ) {
      const transition =
        props.currentMachine.transitions[actualState][actualSymbol];

      await move(transition.write, transition.direction);
      setCurrentState(transition.toState);
      // Check if we reached a final state
      if (!props.currentMachine.finalStates.includes(transition.toState)) {
        return true;
      } else {
        setIsRunning(false);
        return false;
      }
    } else {
      setIsRunning(false);
      return false;
    }
  };

  const controlMachine = async (action) => {
    if (action === "play") {
      if (!isRunning) {
        setIsRunning(true);
        intervalRef.current = setInterval(async () => {
          const continueRunning = await runMachine();
          if (!continueRunning) {
            clearInterval(intervalRef.current);
          }
        }, info.current.duration);
      }
    } else if (action === "stop") {
      await updateInfo("current", 2500);
      await updateInfo("translateX", 0);
      setIsRunning(false);
      clearInterval(intervalRef.current);
    } else if (action === "pasue") {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="w-full my-[60px] overflow-hidden shadow-lg rounded-lg pt-[50px]">
      <div className="mx-5 mb-7 font-semibold tracking-wide text-[18px] flex justify-between">
        <div className="text-center w-[100px]">
          <div>STEP</div>
          <div className=" font-medium">0</div>
        </div>
        <div className="text-center">
          <div>STATE</div>
          <div className=" font-medium">{currentState}</div>
        </div>
        <div className="text-center w-[100px]">
          <div className="text-red-600">ACCEPTED</div>
          <div className=" font-medium link">
            {"("}details{")"}
          </div>
        </div>
      </div>
      <div
        className="flex justify-center gap-[6px] ease-in-out"
        style={{
          transform: `translateX(${info.current.translateX}px)`,
          transitionDuration: `${info.current.duration}ms`,
        }}
      >
        {tape.map((item, index) => {
          return (
            <div
              key={index}
              className="min-w-[55px] font-mono min-h-[55px] text-[20px] grid items-center justify-center font-semibold bg-primary text-base-100 rounded-md shadow-md"
            >
              <div>{item}</div>
            </div>
          );
        })}
      </div>
      <div className="my-2 flex justify-center">
        <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[25px] border-b-primary rounded-md"></div>
      </div>

      <Control
        updateInfo={updateInfo}
        updateLoadWord={updateLoadWord}
        controlMachine={controlMachine}
      />
    </div>
  );
};

export default Tape;
