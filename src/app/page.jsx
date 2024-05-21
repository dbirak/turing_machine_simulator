import Container from "./components/Container";
import Logo from "./components/Logo";
import Tape from "./components/Tape";

const Page = () => {
  return (
    <div className="font-geist min-w-full min-h-full">
      <Container>
        <Logo />
        <Tape />
      </Container>
    </div>
  );
};

export default Page;
