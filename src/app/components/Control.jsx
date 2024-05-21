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

  const onSubmitHandler = async (data) => {
    console.log(12);
  };

  return (
    <div className="mx-5 mt-12 mb-7 lg:flex lg:justify-between block">
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
            <i class="fa-solid fa-play"></i>
          </button>
          <button className="btn block w-[25%] lg:w-[75px] btn-primary join-item">
            <i class="fa-solid fa-pause"></i>
          </button>
          <button className="btn block w-[25%] lg:w-[75px] btn-primary join-item">
            <i class="fa-solid fa-forward-step"></i>
          </button>
          <button className="btn block w-[25%] lg:w-[75px] btn-primary join-item">
            <i class="fa-solid fa-stop"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Control;
