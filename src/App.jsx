import { Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./app/page";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />}></Route>

          <Route
            path="*"
            element={
              <p className="mt-10 text-center text-[30px]">
                Error 404 - Page not found!
              </p>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
