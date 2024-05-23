import { useForm } from "react-hook-form";

const Input = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmitHandler = async (data) => {};

  const styleInputCorrect = "input input-bordered block w-[100%] shadow-md";
  const styleTextAreaCorrect =
    "textarea textarea-bordered w-[100%] min-h-[302px] text-[15px] resize-none shadow-md";

  return (
    <div className="w-full my-[60px] overflow-hidden shadow-lg rounded-lg py-[30px] px-5">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex justify-between gap-12">
          <div className="w-1/3">
            <div>
              <div className="font-semibold tracking-wide text-[18px]">
                NAME:
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="e.g. Binary increment machine"
                  className={styleInputCorrect}
                  {...register("name")}
                />
              </div>
            </div>
            <div className="mt-10">
              <div className="font-semibold tracking-wide text-[18px]">
                INITIAL STATE:
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="e.g. S1"
                  className={styleInputCorrect}
                  {...register("initial state")}
                />
              </div>
            </div>
            <div className="mt-10">
              <div className="font-semibold tracking-wide text-[18px]">
                FINAL STATES:
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="e.g. S2,S3,S4,..."
                  className={styleInputCorrect}
                  {...register("final states")}
                />
              </div>
            </div>
          </div>
          <div className="w-2/3">
            <div className="font-semibold tracking-wide text-[18px]">
              TRANSITIONS:
            </div>
            <div className="mt-3">
              <textarea
                placeholder="e.g. S1"
                className={styleTextAreaCorrect}
                {...register("transitions")}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mt-8 w-full">
          <button className="btn btn-primary w-full">
            <i className="fa-solid fa-gear shadow-md"></i> COMPILE
          </button>
        </div>
        <div className="mt-7 w-full flex justify-between gap-7">
          <div className="w-1/3">
            <button className="btn btn-outline shadow-md rounded-r-none w-full">
              <i className="fa-solid fa-download"></i> SAVE TO FILE
            </button>
          </div>
          <div className="w-1/3">
            <button className="btn btn-outline shadow-md rounded-none w-full">
              <i className="fa-solid fa-upload"></i> LOAD FROM FILE
            </button>
          </div>
          <div className="w-1/3">
            <button className="btn btn-outline shadow-md rounded-l-none w-full">
              <i className="fa-solid fa-link"></i> SHARE LINK
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Input;
