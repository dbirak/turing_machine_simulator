import { useEffect, useState } from "react";
import Control from "./Control";

const Tape = (props) => {
  const [tape, setTape] = useState([]);
  const [translateX, setTranslateX] = useState(0);
  const [druation, setDuration] = useState(600);
  const [current, setCurrent] = useState(2500);

  useEffect(() => {
    let elements = [];

    for (let i = 0; i < 5001; i++) {
      elements.push("");
    }

    elements[2500] = "0";
    elements[2501] = "1";
    elements[2502] = "2";
    elements[2503] = "3";
    elements[2504] = "4";

    setTape(elements);
  }, []);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const setValueInTape = (newValue, index) => {
    let actualTape = tape;
    tape[index] = newValue;
    setTape(actualTape);
  };

  const moveRight = async (newValue, direction) => {
    if (direction === ">") {
      setTranslateX((prev) => prev - 61);
      await sleep(druation);
      setValueInTape("P", current + 1);
      setCurrent((prev) => prev + 1);
    } else if (direction === "<") {
      setTranslateX((prev) => prev + 61);
      await sleep(druation);
      setValueInTape("L", current - 1);
      setCurrent((prev) => prev - 1);
    } else {
      await sleep(druation);
      setValueInTape("L", current);
    }
  };

  const move = async (newValue) => {
    newValue = "K";
    direction;
  };

  return (
    <div className="w-full my-[60px] overflow-hidden shadow-lg rounded-lg pt-[50px]">
      <div
        className="flex justify-center gap-[6px] ease-in-out"
        style={{
          transform: `translateX(${translateX}px)`,
          transitionDuration: `${druation}ms`,
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

      <Control />
    </div>
  );
};

export default Tape;
