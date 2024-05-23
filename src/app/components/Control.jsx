import { useForm } from "react-hook-form";

const Control = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const styleInput =
    "input input-bordered block rounded-r-none w-full lg:max-w-[229px]";

  const onSubmitHandler = async (data) => {};

  const updateDuration = (event) => {
    let value = Number(event.target.value);

    if (value < 100 || value > 1200) return;

    props.updateInfo("duration", value);
  };

  return (
    <div className="mx-5 mt-12 mb-7">
      <div className="lg:flex lg:justify-between block">
        <div className="mb-10 lg:mb-0 shadow-md">
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="flex justify-between"
          >
            <input
              type="text"
              placeholder="Input (e.g. 11010)"
              className={styleInput}
              {...register("input")}
            />
            <button
              className="btn btn-primary rounded-l-none w-[120px] lg:w-[90px]"
              type="submit"
            >
              LOAD
            </button>
          </form>
        </div>
        <div>
          <div className="join join-horizontal flex justify-center shadow-md">
            <button className="btn block w-[25%] lg:w-[75px] btn-primary join-item">
              <i className="fa-solid fa-play"></i>
            </button>
            <button className="btn block w-[25%] lg:w-[75px] btn-primary join-item">
              <i className="fa-solid fa-pause"></i>
            </button>
            <button className="btn block w-[25%] lg:w-[75px] btn-primary join-item">
              <i className="fa-solid fa-forward-step"></i>
            </button>
            <button className="btn block w-[25%] lg:w-[75px] btn-primary join-item">
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
          defaultValue="600"
          className="range"
        />
      </div>
    </div>
  );
};

export default Control;
