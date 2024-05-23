import { useState } from "react";
import Container from "./components/Container";
import Logo from "./components/Logo";
import Tape from "./components/Tape";
import Input from "./components/Input";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="font-geist min-w-full min-h-full">
      <Container>
        <Logo />
        <Tape />
        <Input />
      </Container>
    </div>
  );
};

export default Page;
