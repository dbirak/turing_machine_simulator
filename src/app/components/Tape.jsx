import { useEffect, useRef, useState } from "react";
import Control from "./Control";

const Tape = (props) => {
  const [tape, setTape] = useState([]);

  const info = useRef({
    duration: 600,
    current: 2500,
    translateX: 0,
  });

  const updateInfo = (fieldName, value) => {
    info.current = {
      ...info.current,
      [fieldName]: value,
    };
  };

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

  const move = async (newValue, direction) => {
    if (direction === ">") {
      updateInfo("translateX", info.current.translateX - 61);
      await sleep(info.current.duration);
      setValueInTape("P", info.current.current + 1);
      updateInfo("current", info.current.current + 1);
    } else if (direction === "<") {
      updateInfo("translateX", info.current.translateX + 61);
      await sleep(info.current.duration);
      setValueInTape("L", info.current.current - 1);
      updateInfo("current", info.current.current - 1);
    } else {
      await sleep(info.current.duration);
      setValueInTape("L", info.current.current);
    }
  };

  return (
    <div className="w-full my-[60px] overflow-hidden shadow-lg rounded-lg pt-[50px]">
      <div
        className="flex justify-center gap-[6px] ease-in-out"
        style={{
          transform: `translateX(${info.current.translateX}px)`,
          transitionDuration: `${info.current.druation}ms`,
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

      <Control updateInfo={updateInfo} />
    </div>
  );
};

export default Tape;
