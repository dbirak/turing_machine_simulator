import { useState } from "react";
import { useForm } from "react-hook-form";

const Control = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const [controlDetails, setControlDetails] = useState({
    input: true,
    load: true,
    play: true,
    pause: false,
    step: true,
    stop: true,
    speed: true,
  });

  const LoadButtonStyle =
    "btn btn-primary rounded-l-none w-[120px] lg:w-[90px]";

  const ControlButtonStyle =
    "btn block w-[25%] lg:w-[75px] btn-primary join-item";

  const styleInputCorrect =
    "input input-bordered text-[12px] lg:text-[15px] block rounded-r-none w-full lg:max-w-[229px]";
  const styleInputError = styleInputCorrect + " input-error text-error";
  const styleInputDisabled = styleInputCorrect + " bg-gray-100";

  const onSubmitHandler = async (data) => {
    const inputRegex = /^[^\s,]+$/;

    if (!inputRegex.test(data.input)) {
      setError("input", {
        message: `Input cannot contain whitespace and commas`,
      });

      return;
    }

    setControlDetails({
      input: false,
      load: false,
      play: true,
      pause: false,
      step: true,
      stop: true,
      speed: true,
    });

    props.updateLoadWord(data.input);
  };

  const updateDuration = (event) => {
    let value = Number(event.target.value);

    if (value < 100 || value > 1200) return;

    props.updateInfo("duration", 1200 - (value - 100));
  };

  const Play = () => {
    setControlDetails({
      input: false,
      load: false,
      play: false,
      pause: true,
      step: false,
      stop: true,
      speed: true,
    });

    clearErrors("input");

    props.controlMachine("play");
  };

  const Pause = () => {
    setControlDetails({
      input: false,
      load: false,
      play: true,
      pause: false,
      step: true,
      stop: true,
      speed: true,
    });

    clearErrors("input");

    props.controlMachine("pause");
  };

  const Step = () => {
    setControlDetails({
      input: false,
      load: false,
      play: true,
      pause: false,
      step: true,
      stop: true,
      speed: true,
    });

    clearErrors("input");

    props.controlMachine("step");
  };

  const Stop = () => {
    setControlDetails({
      input: true,
      load: true,
      play: true,
      pause: false,
      step: true,
      stop: true,
      speed: true,
    });

    props.controlMachine("stop");
  };

  return (
    <div className="mx-5 mt-12 mb-7">
      <div className="lg:flex lg:justify-between block">
        <div>
          <div className="shadow-md">
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="flex justify-between"
            >
              <input
                type="text"
                placeholder="Input (e.g. 11010)"
                className={
                  !controlDetails.input
                    ? styleInputDisabled
                    : errors.input
                    ? styleInputError
                    : styleInputCorrect
                }
                disabled={!controlDetails.input}
                {...register("input")}
              />
              <button
                className={
                  controlDetails.load
                    ? LoadButtonStyle
                    : LoadButtonStyle +
                      " btn-disabled bg-gray-200 cursor-not-allowed"
                }
                type="submit"
              >
                LOAD
              </button>
            </form>
          </div>
          <label className="mb-10 lg:mb-0 label h-[32px] truncate">
            {errors.input && (
              <span className="label-text-alt text-error text-[13px]">
                {errors.input.message}
              </span>
            )}
          </label>
        </div>
        <div>
          <div className="join join-horizontal flex justify-center shadow-md">
            <button
              className={
                controlDetails.play
                  ? ControlButtonStyle
                  : ControlButtonStyle +
                    " btn-disabled bg-gray-200 cursor-not-allowed"
              }
              onClick={Play}
            >
              <i className="fa-solid fa-play"></i>
            </button>
            <button
              className={
                controlDetails.pause
                  ? ControlButtonStyle
                  : ControlButtonStyle +
                    " btn-disabled bg-gray-200 cursor-not-allowed"
              }
              onClick={Pause}
            >
              <i className="fa-solid fa-pause"></i>
            </button>
            <button
              className={
                controlDetails.step
                  ? ControlButtonStyle
                  : ControlButtonStyle +
                    " btn-disabled bg-gray-200 cursor-not-allowed"
              }
              onClick={Step}
            >
              <i className="fa-solid fa-forward-step"></i>
            </button>
            <button
              className={
                controlDetails.stop
                  ? ControlButtonStyle
                  : ControlButtonStyle +
                    " btn-disabled bg-gray-200 cursor-not-allowed"
              }
              onClick={Stop}
            >
              <i className="fa-solid fa-stop"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 font-semibold tracking-wide text-[18px]">
        SPEED:
      </div>
      <div className="mt-3">
        <input
          onChange={updateDuration}
          type="range"
          min={100}
          max="1200"
          step="50"
          defaultValue="650"
          className="range"
        />
      </div>
    </div>
  );
};

export default Control;
