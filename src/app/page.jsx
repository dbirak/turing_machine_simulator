import { useState } from "react";
import Container from "./components/Container";
import Logo from "./components/Logo";
import Tape from "./components/Tape";
import Input from "./components/Input";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentMachine, setCurrentMachine] = useState({
    name: "Even amount of zeros",
    initialState: "q0",
    finalStates: ["qAccept"],
    transitions: {
      q0: {
        0: {
          direction: ">",
          write: "1",
          toState: "q1",
        },
        1: {
          direction: ">",
          write: "0",
          toState: "q0",
        },
        _: {
          direction: "-",
          write: "_",
          toState: "qAccept",
        },
      },
      q1: {
        0: {
          direction: ">",
          write: "0",
          toState: "q0",
        },
        1: {
          direction: ">",
          write: "1",
          toState: "q1",
        },
      },
    },
  });

  const updateCurrentMachine = (value) => {
    setCurrentMachine(value);
  };

  return (
    <div className="font-geist min-w-full min-h-full">
      <Container>
        <Logo />
        <Tape currentMachine={currentMachine} />
        <Input updateCurrentMachine={updateCurrentMachine} />
      </Container>
    </div>
  );
};

export default Page;
