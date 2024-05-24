import { useForm } from "react-hook-form";

const Input = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmitHandler = async (data) => {
    let flag = true;
    let finalStates = data["final states"].split(",");
    let transitions = {};

    const lines = data.transitions.split("\n");

    const stateRegex = /^[a-zA-Z0-9]+$/;
    const symbolRegex = /^[^,\s]$/;
    const directionRegex = /^[><-]$/;
    const nameRegex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9]+$/u;

    if (!nameRegex.test(data.name.trim())) {
      setError("name", {
        message: `Invalid machine name`,
      });

      flag = false;
    }

    if (!stateRegex.test(data["initial state"].trim())) {
      setError("initial state", {
        message: `Invalid initial state`,
      });

      flag = false;
    }

    for (let i = 0; i < finalStates.length; i++) {
      if (!stateRegex.test(finalStates[i].trim())) {
        setError("final states", {
          message: `Invalid final states`,
        });

        flag = false;

        break;
      }

      finalStates[i] = finalStates[i].trim();
    }

    if (data.transitions.trim().length === 0) {
      setError("transitions", {
        message: `Transitions cannot be empty`,
      });

      flag = false;
    }

    for (let index = 0; index < lines.length; index++) {
      const trimmedLine = lines[index].trim();

      // Ignoruj puste linie
      if (trimmedLine === "") {
        continue;
      }

      // Ignoruj całkowite komentarze
      if (trimmedLine.startsWith("#")) {
        continue;
      }

      const [mainPart] = trimmedLine.split("#");
      const parts = mainPart.trim().split(",");

      if (parts.length !== 5) {
        setError("transitions", {
          message: `Line ${index + 1}: Invalid number of parameters`,
        });
        return false;
      }

      const [fromState, readSymbol, direction, writeSymbol, toState] =
        parts.map((part) => part.trim());

      if (!stateRegex.test(fromState)) {
        setError("transitions", {
          message: `Line ${index + 1}: Invalid name of the input state`,
        });
        return;
      }
      if (!symbolRegex.test(readSymbol)) {
        setError("transitions", {
          message: `Line ${index + 1}: Invalid symbol to write`,
        });
        return;
      }
      if (!directionRegex.test(direction)) {
        setError("transitions", {
          message: `Line ${index + 1}: Invalid direction`,
        });
        return;
      }
      if (!symbolRegex.test(writeSymbol)) {
        setError("transitions", {
          message: `Line ${index + 1}: Invalid symbol to write`,
        });
        return;
      }
      if (!stateRegex.test(toState)) {
        setError("transitions", {
          message: `Line ${index + 1}: Invalid name of the output state`,
        });
        return;
      }

      if (fromState in transitions) {
        if (readSymbol in transitions[fromState]) {
          setError("transitions", {
            message: `Line ${
              index + 1
            }: The transition function for the read symbol in this state has already been declared earlier`,
          });
          return;
        }

        transitions[fromState][readSymbol] = {
          direction: direction,
          write: writeSymbol,
          toState: toState,
        };
      } else {
        transitions[fromState] = {
          [readSymbol]: {
            direction: direction,
            write: writeSymbol,
            toState: toState,
          },
        };
      }
    }

    if (flag === true) {
      let machine = {
        name: data.name.trim(),
        initial_state: data["initial state"].trim(),
        finalStates: finalStates,
        transitions: transitions,
      };

      console.log(machine);
    }

    // jak tutaj zapisywać do transitions
  };

  const styleInputCorrect = "input input-bordered block w-[100%] shadow-md";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const styleTextAreaCorrect =
    "textarea textarea-bordered block w-[100%] min-h-[358px] text-[15px] resize-none shadow-md";
  const styleTextAreaError =
    styleTextAreaCorrect + " textarea-error text-error";

  const placeholderTextArea =
    "# Transitions syntax:\n# {FROM STATE},{READ},{DIRECTION},{WRITE},{TO STATE}\n\n# DIRECTION:                            [ LEFT < ]   [ RIGHT > ]   [ HOLD - ]\n# READ / WRITE:                       [ Any symbols without space ]   [ Blank symbol _ ]\n# FROM STATE / TO STATE:     [ Any words without space ]\n\n # Example:\nS1,a,>,b,S2\nS2,b,>,b,S2\nS2,_,-,_,END";

  return (
    <div className="w-full my-[60px] overflow-hidden shadow-lg rounded-lg py-[30px] px-5">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="lg:flex lg:justify-between lg:gap-12">
          <div className="lg:w-1/3">
            <div>
              <div className="font-semibold tracking-wide text-[18px]">
                NAME:
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="e.g. Binary increment machine"
                  className={errors.name ? styleInputError : styleInputCorrect}
                  {...register("name")}
                />
                <label className="label h-[32px] truncate">
                  {errors.name && (
                    <span className="label-text-alt text-error text-[13px]">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="mt-9">
              <div className="font-semibold tracking-wide text-[18px]">
                INITIAL STATE:
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="e.g. S1"
                  className={
                    errors["initial state"]
                      ? styleInputError
                      : styleInputCorrect
                  }
                  {...register("initial state")}
                />
                <label className="label h-[32px] truncate">
                  {errors["initial state"] && (
                    <span className="label-text-alt text-error text-[13px]">
                      {errors["initial state"].message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="mt-9">
              <div className="font-semibold tracking-wide text-[18px]">
                FINAL STATES:
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="e.g. S2,S3,S4,..."
                  className={
                    errors["final states"] ? styleInputError : styleInputCorrect
                  }
                  {...register("final states")}
                />
                <label className="label h-[32px] truncate">
                  {errors["final states"] && (
                    <span className="label-text-alt text-error text-[13px]">
                      {errors["final states"].message}
                    </span>
                  )}
                </label>
              </div>
            </div>
          </div>
          <div className="mt-9 lg:mt-0 lg:w-2/3">
            <div className="font-semibold tracking-wide text-[18px]">
              TRANSITIONS:
            </div>
            <div className="mt-3">
              <textarea
                placeholder={placeholderTextArea}
                className={
                  errors["transitions"]
                    ? styleTextAreaError
                    : styleTextAreaCorrect
                }
                {...register("transitions")}
              ></textarea>
              <label className="label h-[32px] truncate">
                {errors.transitions && (
                  <span className="label-text-alt text-error text-[13px]">
                    {errors.transitions.message}
                  </span>
                )}
              </label>
            </div>
          </div>
        </div>
        <div className="mt-8 w-full">
          <button type="submit" className="btn btn-primary w-full">
            <i className="fa-solid fa-gear shadow-md"></i> COMPILE
          </button>
        </div>
        <div className="mt-7 w-full md:flex md:justify-between md:gap-7">
          <div className="mb-4 md:mb-0 md:w-1/3">
            <button className="btn btn-outline shadow-md md:rounded-r-none w-full">
              <i className="fa-solid fa-download"></i> SAVE TO FILE
            </button>
          </div>
          <div className="mb-4 md:mb-0 md:w-1/3">
            <button className="btn btn-outline shadow-md md:rounded-none w-full">
              <i className="fa-solid fa-upload"></i> LOAD FROM FILE
            </button>
          </div>
          <div className="md:w-1/3">
            <button className="btn btn-outline shadow-md md:rounded-l-none w-full">
              <i className="fa-solid fa-link"></i> SHARE LINK
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Input;
